import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useAdminSync() {
  const [patientData, setPatientData] = useState<any>({});
  const [status, setStatus] = useState<"inactive" | "actively_filling" | "submitted">("inactive");

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    const channel = supabase.channel('patient-room', {
      config: {
        broadcast: { ack: false },
        presence: { key: 'admin' },
      },
    });

    channel
      .on('broadcast', { event: 'form-update' }, (payload) => {
        // Update the admin view with real-time data from the patient form
        setPatientData(payload.payload);
      })
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        // Check if there is a patient in the room and what their status is
        if (state.patient && state.patient.length > 0) {
          const patientStatus = (state.patient[0] as any).status;
          setStatus(patientStatus);
        } else {
          // If no patient is connected, set status back to inactive
          setStatus("inactive");
          setPatientData({}); // Optionally clear data when patient leaves
        }
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return { patientData, status };
}
