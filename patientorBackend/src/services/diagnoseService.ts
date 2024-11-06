import diagnoses from '../../data/diagnoses';
import { DiagnoseType } from '../types';

const getDiagnoses = (): DiagnoseType[] => {
    return diagnoses;
};

export default {
    getDiagnoses
};