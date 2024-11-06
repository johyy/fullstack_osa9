import patients from '../../data/patients-full';
import { NewPatientType, NonSensitivePatientType, PatientType } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): PatientType[] => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatientType[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( entry: NewPatientType ): PatientType => {
    const newPatient = {
        id: uuid(),
        ...entry
    };

    patients.push(newPatient);
    return newPatient;
};

const findById = (id: string): PatientType | undefined => {
    const patient = patients.find(p => p.id === id);
    if (patient) {
        return { ...patient, entries: patient.entries || [] };
    }
    return undefined;
}


export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    findById
};