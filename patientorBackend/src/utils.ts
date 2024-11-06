import { NewPatientType, Gender } from "./types";
import { z } from 'zod';

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()
});

export const toNewPatient = (object: unknown): NewPatientType => {
    return NewPatientSchema.parse(object);
};

export default toNewPatient;