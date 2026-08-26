import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { PatientFormData } from "@/schemas/patientSchema";

export function usePatientSync(formValues: PatientFormData, isSubmitted: boolean, setIsSubmitted: (val: boolean) => void) {
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const [presence, setPresence] = useState<'inactive' | 'actively_filling' | 'submitted'>('inactive');

  // Initialize Supabase Channel
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    const channel = supabase.channel('patient-room', {
      config: {
        broadcast: { ack: false },
        presence: { key: 'patient' },
      },
    });

    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({ status: 'inactive' });
      }
    });

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
    };
  }, []);

  // Track presence changes to Supabase ONLY when presence state changes
  useEffect(() => {
    if (channelRef.current) {
      channelRef.current.track({ status: presence });
    }
  }, [presence]);

  // Stringify to prevent useEffect from firing on unrelated re-renders
  const stringifiedValues = JSON.stringify(formValues);

  // Broadcast data whenever form actual values change
  useEffect(() => {
    if (channelRef.current) {
      // Send form data via broadcast
      channelRef.current.send({
        type: 'broadcast',
        event: 'form-update',
        payload: formValues,
      });
      
      // Check if there is data
      const hasData = Object.values(formValues).some((v) => v !== undefined && v !== "");
      
      // Update local presence state (which triggers the other useEffect to track)
      setPresence(hasData ? 'actively_filling' : 'inactive');
      
      // Hide success banner if user starts typing again
      setIsSubmitted(false);
    }
  }, [stringifiedValues]); // Using stringified values as dependency

  return { setPresence };
}
