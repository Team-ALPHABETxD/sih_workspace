"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { toast } from "react-toastify";
import { CheckCircle, AlertTriangle, AlertCircle, ShieldCheck } from "lucide-react";
import Heatmap from "./_components/Heatmap";

interface Report {
  cd: number;
  hei: number;
  hmpi: number;
  sd: string;
  pd: string;
  isCritical: boolean;
  fut: any;
  hmap: any;
  anal: any;
}

const GeneratedReportPage: React.FC = () => {
/*   const searchParams = useSearchParams();
  const reportData = searchParams.get("reportData");
  const { isAuthenticated } = useAuth();
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to view the report.");
      return;
    }

    if (reportData) {
      try {
        const parsedReport = JSON.parse(decodeURIComponent(reportData));
        setReport(parsedReport);
      } catch (error) {
        console.error("Error parsing report data:", error);
        toast.error("Invalid report data.");
      }
    } else {
      toast.error("No report data provided.");
    }
  }, [reportData, isAuthenticated]); */


  const report = {
        "owner": "68c0376558d95d0d5253c8d4",
        "cd": 2.409333333333334,
        "hei": 11.40933333333333,
        "hmpi": 268.3486606102959,
        "sd": 1,
        "pd": 1,
        "isCritical": 1,
        "fut": {
            "prediction": [
                [
                    0.07,
                    0.905,
                    0.005
                ],
                [
                    0.17391407736207992,
                    0.17364287978983609,
                    0.6512682308180108
                ],
                [
                    0.14300581212382227,
                    0.2610727171479084,
                    0.5962892978936779
                ],
                [
                    0.14045003521031213,
                    0.24821316133567653,
                    0.6113368034540106
                ],
                [
                    0.13856137327318707,
                    0.24904392811427264,
                    0.6123946986125383
                ],
                [
                    0.13802704699143706,
                    0.2487007877045475,
                    0.6132721653040175
                ]
            ],
            "shap": {
                "lat": 0.01,
                "lon": 0.026,
                "rain": 0.01,
                "soil_sus": 0.01,
                "soil_type": 0.01,
                "source": 0.01,
                "state": 0.059,
                "year": 0.009
            }
        },
        "hmap": {
            "curr": {
              "lat": 22.5,
              "lon": 25.23
            },
            "high": [
                {
                    "lat": 22.5,
                    "lon": 25.23,
                    "_id": "68c32ea72e455c1f203050ef"
                },
                {
                    "lat": 22.51,
                    "lon": 25.2,
                    "_id": "68c32ea72e455c1f203050f0"
                },
                {
                    "lat": 22.49,
                    "lon": 25.24,
                    "_id": "68c32ea72e455c1f203050f1"
                },
                {
                    "lat": 22.52,
                    "lon": 25.22,
                    "_id": "68c32ea72e455c1f203050f2"
                },
                {
                    "lat": 22.47,
                    "lon": 25.25,
                    "_id": "68c32ea72e455c1f203050f3"
                }
            ],
            "modarate": [
                {
                    "lat": 22.48,
                    "lon": 25.21,
                    "_id": "68c32ea72e455c1f203050f4"
                },
                {
                    "lat": 22.47,
                    "lon": 25.2,
                    "_id": "68c32ea72e455c1f203050f5"
                },
                {
                    "lat": 22.49,
                    "lon": 25.22,
                    "_id": "68c32ea72e455c1f203050f6"
                },
                {
                    "lat": 22.46,
                    "lon": 25.21,
                    "_id": "68c32ea72e455c1f203050f7"
                },
                {
                    "lat": 22.48,
                    "lon": 25.19,
                    "_id": "68c32ea72e455c1f203050f8"
                }
            ],
            "low": [
                {
                    "lat": 22.4,
                    "lon": 25.15,
                    "_id": "68c32ea72e455c1f203050f9"
                },
                {
                    "lat": 22.55,
                    "lon": 25.1,
                    "_id": "68c32ea72e455c1f203050fa"
                },
                {
                    "lat": 22.45,
                    "lon": 25.28,
                    "_id": "68c32ea72e455c1f203050fb"
                },
                {
                    "lat": 22.38,
                    "lon": 25.2,
                    "_id": "68c32ea72e455c1f203050fc"
                },
                {
                    "lat": 22.52,
                    "lon": 25.12,
                    "_id": "68c32ea72e455c1f203050fd"
                }
            ]
        },
        "anal": {
            "deseases": [
                "The elevated cadmium (Cd) levels in water can cause a range of health problems, most notably kidney damage, osteomalacia, osteoporosis, and increased risk of various cancers.",
                "The extremely high lead (Pb) levels pose severe health risks, particularly neurodevelopmental effects in children, including reduced IQ and behavioral problems, and can also lead to kidney damage, hypertension, and reproductive issues in adults.",
                "The elevated manganese (Mn) levels can lead to neurological disorders, including tremors, difficulty walking, and cognitive deficits, sometimes referred to as manganism, particularly with long-term exposure.",
                "The potentially high cobalt (Co) levels, if sustained, may contribute to cardiomyopathy (heart muscle disease), neurological problems, and thyroid dysfunction."
            ],
            "precautions": [
                "Issue an immediate 'Do Not Drink' advisory for this water source due to critically elevated levels of lead and cadmium, which pose severe and acute health risks.",
                "Conduct an urgent, comprehensive investigation to identify the specific sources of lead, cadmium, and manganese contamination in the water body.",
                "Implement advanced water treatment technologies such as reverse osmosis, ion exchange, or specific chelating resin filters to effectively remove all identified heavy metals to safe drinking water standards.",
                "Provide an alternative, safe drinking water supply to the affected population until the existing source is fully remediated and tested to meet all regulatory guidelines.",
                "Establish a robust biomonitoring program for exposed populations, particularly children and pregnant women, to assess heavy metal body burden and identify early health impacts.",
                "Review and strengthen regulatory frameworks and enforcement mechanisms to prevent future contamination from industrial discharges, mining, or agricultural runoff if identified as sources."
            ]
        },
        "hmcs": [
            {
                "name": "cd",
                "val": 0.01,
                "_id": "68c32ea72e455c1f203050fe"
            },
            {
                "name": "cr",
                "val": 0.1,
                "_id": "68c32ea72e455c1f203050ff"
            },
            {
                "name": "pb",
                "val": 0.1,
                "_id": "68c32ea72e455c1f20305100"
            },
            {
                "name": "fe",
                "val": 0.1,
                "_id": "68c32ea72e455c1f20305101"
            },
            {
                "name": "co",
                "val": 0.15,
                "_id": "68c32ea72e455c1f20305102"
            },
            {
                "name": "mn",
                "val": 0.02,
                "_id": "68c32ea72e455c1f20305103"
            },
            {
                "name": "ni",
                "val": 0.01,
                "_id": "68c32ea72e455c1f20305104"
            },
            {
                "name": "cu",
                "val": 0.002,
                "_id": "68c32ea72e455c1f20305105"
            },
            {
                "name": "zn",
                "val": 0.008,
                "_id": "68c32ea72e455c1f20305106"
            }
        ],
        "_id": "68c32ea72e455c1f203050ee",
        "__v": 0
    }

  if (!report) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 p-6 md:p-10 overflow-y-auto bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Heavy Metal Analysis Report
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-center space-x-4">
            <div className={`p-3 rounded-full ${report.isCritical ? 'bg-red-100' : 'bg-green-100'}`}>
              {report.isCritical ? (
                <AlertTriangle className="h-8 w-8 text-red-600" />
              ) : (
                <CheckCircle className="h-8 w-8 text-green-600" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {report.isCritical ? 'Unsafe to Drink' : 'Safe to Drink'}
              </h2>
              <p className="text-gray-600">
                Based on heavy metal concentration analysis
              </p>
            </div>
          </div>

          {/* Contamination Index */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Cd Index</h3>
              <p className="text-3xl font-bold text-blue-600">{report.cd.toFixed(2)}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">HEI</h3>
              <p className="text-3xl font-bold text-purple-600">{report.hei.toFixed(2)}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-2">HMPI</h3>
              <p className="text-3xl font-bold text-green-600">{report.hmpi.toFixed(2)}</p>
            </div>
          </div>

          {/* Degree Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Safety Degree (SD)</h3>
              <p className="text-xl font-medium text-gray-700">{report.sd}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Pollution Degree (PD)</h3>
              <p className="text-xl font-medium text-gray-700">{report.pd}</p>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Future Predictions</h3>
              <pre className="bg-white p-4 rounded text-sm overflow-x-auto border">
                {JSON.stringify(report.fut, null, 2)}
              </pre>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Heatmap</h3>
              {report.hmap ? (
                <Heatmap hmap={report.hmap} />
              ) : (
                <p>No heatmap data available</p>
              )}
            </div>


            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
                <span>AI Analysis</span>
              </h3>
              {report.anal && (
                <>
                  {report.anal.deseases && (
                    <div className="mb-4">
                      <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span>Diseases</span>
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {report.anal.deseases.map((disease: string, index: number) => (
                          <li key={index}>{disease}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {report.anal.precautions && (
                    <div>
                      <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Precautions</span>
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {report.anal.precautions.map((precaution: string, index: number) => (
                          <li key={index}>{precaution}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-6">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Print Report
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Generate Another Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedReportPage;