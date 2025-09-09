// Calculate PAYE (Tax) based on Kenya PAYE rates (from July 2023)
function calculatePAYE(taxablePay) {
  let tax = 0;

  if (taxablePay <= 24000) {
    tax = taxablePay * 0.1;
  } else if (taxablePay <= 32333) {
    tax = (24000 * 0.1) + ((taxablePay - 24000) * 0.25);
  } else if (taxablePay <= 500000) {
    tax = (24000 * 0.1) + ((32333 - 24000) * 0.25) + ((taxablePay - 32333) * 0.30);
  } else if (taxablePay <= 800000) {
    tax = (24000 * 0.1) + ((32333 - 24000) * 0.25) + ((500000 - 32333) * 0.30) + ((taxablePay - 500000) * 0.325);
  } else {
    tax = (24000 * 0.1) + ((32333 - 24000) * 0.25) + ((500000 - 32333) * 0.30) +
          ((800000 - 500000) * 0.325) + ((taxablePay - 800000) * 0.35);
  }

  // Apply personal relief (2,400)
  tax -= 2400;
  return tax < 0 ? 0 : tax;
}

// NHIF Deductions (Kenya rates)
function calculateNHIF(grossSalary) {
  const rates = [
    { max: 5999, amount: 150 },
    { max: 7999, amount: 300 },
    { max: 11999, amount: 400 },
    { max: 14999, amount: 500 },
    { max: 19999, amount: 600 },
    { max: 24999, amount: 750 },
    { max: 29999, amount: 850 },
    { max: 34999, amount: 900 },
    { max: 39999, amount: 950 },
    { max: 44999, amount: 1000 },
    { max: 49999, amount: 1100 },
    { max: 59999, amount: 1200 },
    { max: 69999, amount: 1300 },
    { max: 79999, amount: 1400 },
    { max: 89999, amount: 1500 },
    { max: 99999, amount: 1600 },
    { max: 109999, amount: 1700 },
    { max: 119999, amount: 1800 },
    { max: 129999, amount: 1900 },
    { max: 139999, amount: 2000 },
    { max: 149999, amount: 2100 },
    { max: Infinity, amount: 1700 }
  ];

  for (let r of rates) {
    if (grossSalary <= r.max) return r.amount;
  }
  return 0;
}

function calculateNSSF(grossSalary) {
  return Math.min(grossSalary * 0.06, 1080);
}

document.getElementById("calculateBtn").addEventListener("click", function() {
  const basic = Number(document.getElementById("basic").value);
  const benefits = Number(document.getElementById("benefits").value);

  if (isNaN(basic) || isNaN(benefits) || basic < 0 || benefits < 0) {
    alert("Please enter valid values for Basic Salary and Benefits");
    return;
  }

  const grossSalary = basic + benefits;
  const paye = calculatePAYE(grossSalary);
  const nhif = calculateNHIF(grossSalary);
  const nssf = calculateNSSF(grossSalary);

  const netSalary = grossSalary - paye - nhif - nssf;

  // Display results
  document.getElementById("gross").textContent = `Ksh ${grossSalary.toLocaleString()}`;
  document.getElementById("paye").textContent = `Ksh ${paye.toLocaleString()}`;
  document.getElementById("nhif").textContent = `Ksh ${nhif.toLocaleString()}`;
  document.getElementById("nssf").textContent = `Ksh ${nssf.toLocaleString()}`;
  document.getElementById("net").textContent = `Ksh ${netSalary.toLocaleString()}`;

  document.getElementById("result").style.display = "block";
});
