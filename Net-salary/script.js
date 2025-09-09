// PAYE calculation (Kenya bands 2023 onwards)
function calculatePAYE(taxable) {
  let tax = 0;
  if (taxable <= 24000) {
    tax = taxable * 0.10;
  } else if (taxable <= 32333) {
    tax = 24000 * 0.10 + (taxable - 24000) * 0.25;
  } else if (taxable <= 500000) {
    tax = 24000 * 0.10 + (32333 - 24000) * 0.25 + (taxable - 32333) * 0.30;
  } else if (taxable <= 800000) {
    tax = 24000 * 0.10 + (32333 - 24000) * 0.25 + (500000 - 32333) * 0.30 +
          (taxable - 500000) * 0.325;
  } else {
    tax = 24000 * 0.10 + (32333 - 24000) * 0.25 + (500000 - 32333) * 0.30 +
          (800000 - 500000) * 0.325 + (taxable - 800000) * 0.35;
  }
  // Apply personal relief
  tax -= 2400;
  return tax > 0 ? tax : 0;
}

// SHIF (2.75% of gross)
function calculateSHIF(gross) {
  return gross * 0.0275;
}

// NSSF (new tier system Feb 2025)
function calculateNSSF(gross) {
  let e = 0;
  const tier1 = Math.min(gross, 8000);
  e += tier1 * 0.06;
  if (gross > 8000) {
    const tier2 = Math.min(gross - 8000, 72000 - 8000);
    e += tier2 * 0.06;
  }
  return e;
}

// Housing Levy (1.5% of gross, employee share)
function calculateHousingLevy(gross) {
  return gross * 0.015;
}

// Event listener
document.getElementById('calculateBtn').addEventListener('click', () => {
  const basic = Number(document.getElementById('basic').value) || 0;
  const benefits = Number(document.getElementById('benefits').value) || 0;

  const gross = basic + benefits;
  const taxable = gross;
  const paye = calculatePAYE(taxable);
  const shif = calculateSHIF(gross);
  const nssf = calculateNSSF(gross);
  const housing = calculateHousingLevy(gross);
  const net = gross - paye - shif - nssf - housing;

  document.getElementById('gross').textContent = `Ksh ${gross.toLocaleString()}`;
  document.getElementById('taxable').textContent = `Ksh ${taxable.toLocaleString()}`;
  document.getElementById('paye').textContent = `Ksh ${paye.toFixed(2)}`;
  document.getElementById('shif').textContent = `Ksh ${shif.toFixed(2)}`;
  document.getElementById('nssf').textContent = `Ksh ${nssf.toFixed(2)}`;
  document.getElementById('housing').textContent = `Ksh ${housing.toFixed(2)}`;
  document.getElementById('net').textContent = `Ksh ${net.toLocaleString()}`;

  document.getElementById('result').style.display = 'block';
});
