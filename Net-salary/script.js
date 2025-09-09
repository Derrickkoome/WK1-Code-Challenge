// PAYE calculation (Kenya tax bands 2023 onwards)
function calculatePAYE(taxable) {
  let tax = 0;
  if (taxable <= 24000) {
    tax = taxable * 0.10; // 10% for income up to 24k
  } else if (taxable <= 32333) {
    tax = 24000 * 0.10 + (taxable - 24000) * 0.25; // 25% for 24,001 - 32,333
  } else if (taxable <= 500000) {
    tax = 24000 * 0.10 + (32333 - 24000) * 0.25 + (taxable - 32333) * 0.30; // 30% for 32,334 - 500k
  } else if (taxable <= 800000) {
    tax = 24000 * 0.10 + (32333 - 24000) * 0.25 + (500000 - 32333) * 0.30 +
          (taxable - 500000) * 0.325; // 32.5% for 500,001 - 800k
  } else {
    tax = 24000 * 0.10 + (32333 - 24000) * 0.25 + (500000 - 32333) * 0.30 +
          (800000 - 500000) * 0.325 + (taxable - 800000) * 0.35; // 35% above 800k
  }
  tax -= 2400; // Apply personal relief (monthly)
  return tax > 0 ? tax : 0; // Ensure no negative tax
}

// SHIF deduction (2.75% of gross salary)
function calculateSHIF(gross) {
  return gross * 0.0275;
}

// NSSF deduction (new tier system Feb 2025)
function calculateNSSF(gross) {
  let e = 0;
  const tier1 = Math.min(gross, 8000); // Tier 1 capped at 8k
  e += tier1 * 0.06; // 6% on tier 1
  if (gross > 8000) {
    const tier2 = Math.min(gross - 8000, 72000 - 8000); // Tier 2 capped at 72k
    e += tier2 * 0.06; // 6% on tier 2
  }
  return e;
}

// Housing Levy deduction (1.5% of gross salary)
function calculateHousingLevy(gross) {
  return gross * 0.015;
}

// Handle calculate button click
document.getElementById('calculateBtn').addEventListener('click', () => {
  // Get inputs
  const basic = Number(document.getElementById('basic').value) || 0;
  const benefits = Number(document.getElementById('benefits').value) || 0;

  // Compute salary components
  const gross = basic + benefits;
  const taxable = gross;
  const paye = calculatePAYE(taxable);
  const shif = calculateSHIF(gross);
  const nssf = calculateNSSF(gross);
  const housing = calculateHousingLevy(gross);
  const net = gross - paye - shif - nssf - housing;

  // Display results
  document.getElementById('gross').textContent = `Ksh ${gross.toLocaleString()}`;
  document.getElementById('taxable').textContent = `Ksh ${taxable.toLocaleString()}`;
  document.getElementById('paye').textContent = `Ksh ${paye.toFixed(2)}`;
  document.getElementById('shif').textContent = `Ksh ${shif.toFixed(2)}`;
  document.getElementById('nssf').textContent = `Ksh ${nssf.toFixed(2)}`;
  document.getElementById('housing').textContent = `Ksh ${housing.toFixed(2)}`;
  document.getElementById('net').textContent = `Ksh ${net.toLocaleString()}`;

  // Show results section
  document.getElementById('result').style.display = 'block';
});
