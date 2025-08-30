import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fetchPatient = async (id: string) => {
  const res = await fetch(`/api/patients/${id}`);
  if (!res.ok) throw new Error("Failed to fetch patient details");
  return res.json();
};

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: patient, isLoading, error } = useQuery({
    queryKey: ["patient", id],
    queryFn: () => fetchPatient(id!),
    enabled: !!id,
  });

  if (isLoading) return <p className="text-center mt-6 text-lg">Loading...</p>;
  if (error)
    return <p className="text-center mt-6 text-red-500">Error loading patient details</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="shadow-xl rounded-2xl border border-gray-200">
        <CardContent className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800">Patient Details</h2>
            <Button variant="outline" onClick={() => navigate(-1)}>
              ⬅ Back
            </Button>
          </div>

          {/* Patient Info */}
          <div className="grid grid-cols-2 gap-6 text-gray-700">
            <div>
              <p className="font-semibold">Name</p>
              <p>{patient.name}</p>
            </div>
            <div>
              <p className="font-semibold">Age</p>
              <p>{patient.age}</p>
            </div>
            <div>
              <p className="font-semibold">Gender</p>
              <p>{patient.gender}</p>
            </div>
            <div>
              <p className="font-semibold">Disease</p>
              <p>{patient.disease}</p>
            </div>
            <div>
              <p className="font-semibold">Admission No.</p>
              <p>{patient.admissionNumber}</p>
            </div>
          </div>

          {/* Bed Info */}
          {patient.bed && (
            <div className="border-t pt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Assigned Bed</h3>
              <div className="grid grid-cols-2 gap-6 text-gray-700">
                <div>
                  <p className="font-semibold">Ward</p>
                  <p>{patient.bed.ward}</p>
                </div>
                <div>
                  <p className="font-semibold">Bed Number</p>
                  <p>{patient.bed.bedNumber}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDetails;
