import { MainLayout } from "@/components/layout/MainLayout";
import { PatientAdmissionForm } from "@/components/admission/PatientAdmissionForm";

const Admission = () => {
  return (
    <MainLayout>
      <PatientAdmissionForm />
    </MainLayout>
  );
};

export default Admission;