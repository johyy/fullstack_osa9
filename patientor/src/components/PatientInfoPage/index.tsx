import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';


const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const fetchedPatient = await patientService.getById(id);
        setPatient(fetchedPatient);
      }
    };
    void fetchPatient();
  }, [id]);

  if (!patient) return <p>Loading...</p>;

  return (
    <div>
      <h2>{patient.name} 
      {patient.gender === "male" ? (
        <MaleIcon />
      ) : patient.gender === "female" ? (
        <FemaleIcon />
      ) : ( <TransgenderIcon />
      )}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {patient.entries.length > 0 ? (
        <ul>
          {patient.entries.map((entry: Entry) => (
            <li key={entry.id}>
              {entry.date} <i>{entry.description}</i>
              {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                <div>
                  <ul>
                    {entry.diagnosisCodes.map((code) => (
                      <li key={code}>{code}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No entries!</p>
      )}
    </div>
  );
}
  

export default PatientInfoPage;