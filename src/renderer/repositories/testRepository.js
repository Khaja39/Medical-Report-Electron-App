export class MedicalTestRepository {
  constructor() {
    this.tests = new Map([
      ["Complete Blood Tests (CBC)", [
        { key: "hb", label: "Hemoglobin (Hb)", unit: "g/dL", range: "11.5 - 15.5", min: 11.5, max: 15.5 },
        { key: "rbc", label: "RBC Count", unit: "10^6/µL", range: "3.8 - 5.2", min: 3.8, max: 5.2 },
        { key: "wbc", label: "WBC Count", unit: "10^3/µL", range: "4.5 - 11.0", min: 4.5, max: 11.0 },
        { key: "platelet", label: "Platelet Count", unit: "10^3/µL", range: "150 - 450", min: 150, max: 450 },
        { key: "hct", label: "Hematocrit (PCV)", unit: "%", range: "35.0 - 45.0", min: 35.0, max: 45.0 },
        { key: "mcv", label: "MCV", unit: "fL", range: "77 - 95", min: 77, max: 95 },
        { key: "mch", label: "MCH", unit: "pg", range: "25 - 33", min: 25, max: 33 },
        { key: "mchc", label: "MCHC", unit: "g/dL", range: "31 - 37", min: 31, max: 37 },
        { key: "rdw", label: "RDW", unit: "%", range: "11.5 - 14.5", min: 11.5, max: 14.5 },
        { key: "diff_count", label: "Differential Count", unit: "-", range: "Neutrophils/Lymphocytes" },
        { key: "smear", label: "Peripheral Smear", unit: "-", range: "Normal Morphology" },
        { key: "retic", label: "Reticulocyte Count", unit: "%", range: "0.5 - 2.5", min: 0.5, max: 2.5 },
        { key: "esr", label: "ESR", unit: "mm/hr", range: "0 - 15", min: 0, max: 15 }, 
        { key: "crp", label: "CRP", unit: "mg/L", range: "< 6.0", max: 6.0 },
        { key: "procalcitonin", label: "Procalcitonin", unit: "ng/mL", range: "< 0.15", max: 0.15 }
      ]],

      ["Blood Sugar Tests", [
        { key: "rbs", label: "Random Blood Sugar (RBS)", unit: "mg/dL", range: "70 - 140", min: 70, max: 140 },
        { key: "fbs", label: "Fasting Blood Sugar (FBS)", unit: "mg/dL", range: "70 - 99", min: 70, max: 99 },
        { key: "ppbs", label: "Post Prandial Blood Sugar (PPBS)", unit: "mg/dL", range: "< 140", max: 140 },
        { key: "hba1c", label: "HbA1c", unit: "%", range: "< 5.7", max: 5.7 },
        { key: "ogtt", label: "Oral Glucose Tolerance Test (OGTT)", unit: "mg/dL", range: "< 140 (2 hr)", max: 140 }
      ]],

      ["Liver Function Tests (LFT)", [
        { key: "bt", label: "Total Bilirubin", unit: "mg/dL", range: "0.2 - 1.2", min: 0.2, max: 1.2 },
        { key: "bd", label: "Direct Bilirubin", unit: "mg/dL", range: "0.0 - 0.3", min: 0.0, max: 0.3 },
        { key: "bi", label: "Indirect Bilirubin", unit: "mg/dL", range: "0.2 - 0.8", min: 0.2, max: 0.8 },
        { key: "sgot", label: "SGOT (AST)", unit: "U/L", range: "10 - 40", min: 10, max: 40 },
        { key: "sgpt", label: "SGPT (ALT)", unit: "U/L", range: "10 - 45", min: 10, max: 45 },
        { key: "alp", label: "Alkaline Phosphatase (ALP)", unit: "U/L", range: "100 - 320", min: 100, max: 320 },
        { key: "tp", label: "Total Protein", unit: "g/dL", range: "6.0 - 8.0", min: 6.0, max: 8.0 },
        { key: "alb", label: "Albumin", unit: "g/dL", range: "3.5 - 5.0", min: 3.5, max: 5.0 },
        { key: "glob", label: "Globulin", unit: "g/dL", range: "2.3 - 3.5", min: 2.3, max: 3.5 }
      ]],

      ["Kidney Function Tests (KFT)", [
        { key: "urea", label: "Blood Urea", unit: "mg/dL", range: "15 - 40", min: 15, max: 40 },
        { key: "creatinine", label: "Serum Creatinine", unit: "mg/dL", range: "0.4 - 1.0", min: 0.4, max: 1.0 },
        { key: "uric_acid", label: "Uric Acid", unit: "mg/dL", range: "2.4 - 6.0", min: 2.4, max: 6.0 },
        { key: "egfr", label: "eGFR", unit: "mL/min/1.73m²", range: "> 90", min: 90 },
        { key: "bun", label: "BUN", unit: "mg/dL", range: "7 - 20", min: 7, max: 20 }
      ]],

      ["Electrolytes", [
        { key: "na", label: "Sodium (Na+)", unit: "mEq/L", range: "135 - 145", min: 135, max: 145 },
        { key: "k", label: "Potassium (K+)", unit: "mEq/L", range: "3.5 - 5.1", min: 3.5, max: 5.1 },
        { key: "cl", label: "Chloride (Cl-)", unit: "mEq/L", range: "96 - 106", min: 96, max: 106 },
        { key: "ca", label: "Calcium", unit: "mg/dL", range: "8.8 - 10.8", min: 8.8, max: 10.8 },
        { key: "mg", label: "Magnesium", unit: "mg/dL", range: "1.7 - 2.4", min: 1.7, max: 2.4 },
        { key: "phos", label: "Phosphorus", unit: "mg/dL", range: "3.0 - 5.4", min: 3.0, max: 5.4 }
      ]],

      ["Thyroid Profile", [
        { key: "tsh", label: "TSH", unit: "µIU/mL", range: "0.7 - 5.9", min: 0.7, max: 5.9 },
        { key: "ft3", label: "Free T3", unit: "pg/mL", range: "2.4 - 4.2", min: 2.4, max: 4.2 },
        { key: "ft4", label: "Free T4", unit: "ng/dL", range: "0.8 - 1.7", min: 0.8, max: 1.7 }
      ]],

      ["Vitamin Tests", [
        { key: "vit_d", label: "Vitamin D (25-OH)", unit: "ng/mL", range: "30 - 100", min: 30, max: 100 },
        { key: "vit_b12", label: "Vitamin B12", unit: "pg/mL", range: "211 - 911", min: 211, max: 911 },
        { key: "folic_acid", label: "Folic Acid", unit: "ng/mL", range: "> 5.4", min: 5.4 }
      ]],

      ["Iron Studies", [
        { key: "fe", label: "Serum Iron", unit: "µg/dL", range: "50 - 120", min: 50, max: 120 },
        { key: "ferritin", label: "Ferritin", unit: "ng/mL", range: "15 - 140", min: 15, max: 140 },
        { key: "tibc", label: "TIBC", unit: "µg/dL", range: "250 - 425", min: 250, max: 425 },
        { key: "tsat", label: "Transferrin Saturation", unit: "%", range: "20 - 50", min: 20, max: 50 }
      ]],

      ["Infection Tests", [
        { key: "dengue_ns1", label: "Dengue NS1 Antigen", unit: "-", range: "Negative" },
        { key: "dengue_igm", label: "Dengue IgM", unit: "-", range: "Negative" },
        { key: "dengue_igg", label: "Dengue IgG", unit: "-", range: "Negative" },
        { key: "malaria", label: "Malaria Parasite (MP)", unit: "-", range: "Not Seen" },
        { key: "typhoid_igm", label: "Typhoid IgM", unit: "-", range: "Negative" },
        { key: "widal", label: "Widal Test", unit: "-", range: "Non-Reactive (< 1:80)" },
        { key: "covid_rtpcr", label: "COVID-19 RT-PCR", unit: "-", range: "Negative" },
        { key: "covid_ag", label: "COVID Antigen", unit: "-", range: "Negative" },
        { key: "flu_ab", label: "Influenza A/B", unit: "-", range: "Negative" },
        { key: "rsv", label: "RSV Antigen", unit: "-", range: "Negative" },
        { key: "chikungunya", label: "Chikungunya IgM", unit: "-", range: "Negative" },
        { key: "leptospira", label: "Leptospira Antibody", unit: "-", range: "Negative" },
        { key: "scrub_typhus", label: "Scrub Typhus IgM", unit: "-", range: "Negative" },
        { key: "hav", label: "Hepatitis A (HAV IgM)", unit: "-", range: "Non-Reactive" },
        { key: "hbv", label: "Hepatitis B (HBsAg)", unit: "-", range: "Non-Reactive" },
        { key: "hcv", label: "Hepatitis C (HCV Ab)", unit: "-", range: "Non-Reactive" },
        { key: "hiv", label: "HIV 1 & 2 Screening", unit: "-", range: "Non-Reactive" }
      ]],

      ["Urine Tests", [
        { key: "u_routine", label: "Urine Routine", unit: "-", range: "Clear / Normal" },
        { key: "u_micro", label: "Urine Microscopy", unit: "/HPF", range: "Pus cells: 0-2, RBCs: Nil" },
        { key: "u_culture", label: "Urine Culture", unit: "-", range: "No Growth" },
        { key: "u_protein", label: "Urine Protein", unit: "-", range: "Nil" },
        { key: "u_sugar", label: "Urine Sugar", unit: "-", range: "Nil" },
        { key: "u_ketones", label: "Urine Ketones", unit: "-", range: "Negative" },
        { key: "u_upt", label: "Urine Pregnancy Test", unit: "-", range: "Negative" }
      ]]
    ]);
  }

  getAvailableTestNames() {
    return Array.from(this.tests.keys());
  }

  getFieldsForTest(testName) {
    return this.tests.get(testName) || [];
  }
}