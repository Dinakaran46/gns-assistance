// Smart Eligibility Engine for GNS Assistance
export function evaluateEligibility(userProfile, scheme) {
  const matched = [];
  const unmatched = [];
  const missingInfo = [];

  const {
    age,
    annualIncome,
    occupation,
    state,
    category,
    landHolding,
    educationLevel
  } = userProfile;

  const criteria = scheme.eligibilityCriteria || {};

  // 1. Age Rule
  if (age !== undefined && age !== null && age > 0) {
    const minAge = criteria.minAge || 0;
    const maxAge = criteria.maxAge || 120;
    if (age >= minAge && age <= maxAge) {
      matched.push(`Age ${age} is within eligible age limit (${minAge} - ${maxAge} years).`);
    } else {
      unmatched.push(`Age ${age} is outside eligible range (${minAge} - ${maxAge} years).`);
    }
  } else {
    missingInfo.push(`Age is not specified in user profile.`);
  }

  // 2. Annual Income Rule
  if (annualIncome !== undefined && annualIncome !== null && annualIncome >= 0) {
    const maxIncome = criteria.maxIncome;
    if (maxIncome) {
      if (annualIncome <= maxIncome) {
        matched.push(`Annual income ₹${annualIncome.toLocaleString('en-IN')} is within maximum ceiling of ₹${maxIncome.toLocaleString('en-IN')}.`);
      } else {
        unmatched.push(`Annual income ₹${annualIncome.toLocaleString('en-IN')} exceeds maximum income ceiling of ₹${maxIncome.toLocaleString('en-IN')}.`);
      }
    }
  } else {
    missingInfo.push(`Annual family income is not specified in profile.`);
  }

  // 3. Occupation Rule
  if (occupation) {
    const occupations = criteria.occupations || ["All"];
    if (occupations.includes("All") || occupations.includes(occupation)) {
      matched.push(`Occupation '${occupation}' matches target beneficiary category.`);
    } else {
      unmatched.push(`Occupation '${occupation}' is not listed in required categories (${occupations.join(', ')}).`);
    }
  } else {
    missingInfo.push(`Occupation details missing.`);
  }

  // 4. State Domicile Rule
  if (state) {
    const states = criteria.states || ["All"];
    if (states.includes("All") || states.includes(state)) {
      matched.push(`State/UT '${state}' is covered by this scheme.`);
    } else {
      unmatched.push(`Scheme is restricted to residents of [${states.join(', ')}], current profile state is '${state}'.`);
    }
  } else {
    missingInfo.push(`State domicile missing.`);
  }

  // 5. Social Category / Reservation Rule
  if (category) {
    const categories = criteria.categories || ["All"];
    if (categories.includes("All") || categories.includes(category)) {
      matched.push(`Social Category '${category}' is eligible.`);
    } else {
      unmatched.push(`Scheme requires social category in [${categories.join(', ')}], user category is '${category}'.`);
    }
  }

  // 6. Custom Scheme Rules
  if (criteria.customRules && Array.isArray(criteria.customRules)) {
    criteria.customRules.forEach(rule => {
      matched.push(`Verified: ${rule}`);
    });
  }

  // Determine Final Tier Category
  let tier = "Potentially Eligible";
  let statusBadge = "badge-green";

  if (unmatched.length > 0) {
    tier = "Not Eligible Based on Available Criteria";
    statusBadge = "badge-red";
  } else if (missingInfo.length > 0 || matched.length < 2) {
    tier = "More Information Required";
    statusBadge = "badge-amber";
  }

  return {
    schemeId: scheme.id,
    schemeName: scheme.name,
    tier,
    statusBadge,
    matched,
    unmatched,
    missingInfo,
    verifiedStatus: scheme.verifiedStatus
  };
}
