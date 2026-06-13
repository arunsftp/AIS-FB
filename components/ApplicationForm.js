import { useMemo, useState } from 'react';

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  program: 'Digital Services',
  employmentType: 'Full-time',
  startDate: '',
  experience: '',
  motivation: '',
  location: 'Sydney',
  agreeToTerms: false,
};

const programOptions = ['Digital Services', 'Cloud Operations', 'Platform Engineering', 'Customer Support'];
const employmentOptions = ['Full-time', 'Part-time', 'Contract'];
const locationOptions = ['Sydney', 'Melbourne', 'Brisbane', 'Canberra', 'Remote'];

function buildErrors(formData) {
  const errors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required.';
  }

  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!formData.startDate) {
    errors.startDate = 'Preferred start date is required.';
  }

  if (!formData.experience.trim()) {
    errors.experience = 'Experience summary is required.';
  }

  if (!formData.motivation.trim()) {
    errors.motivation = 'Tell us why you are applying.';
  }

  if (!formData.agreeToTerms) {
    errors.agreeToTerms = 'You must confirm the declaration.';
  }

  return errors;
}

export default function ApplicationForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' });

  const applicationPreview = useMemo(
    () => [
      { label: 'Applicant', value: `${formData.firstName || 'First'} ${formData.lastName || 'Last'}`.trim() },
      { label: 'Program', value: formData.program },
      { label: 'Employment', value: formData.employmentType },
      { label: 'Start date', value: formData.startDate || 'Not selected' },
      { label: 'Location', value: formData.location },
    ],
    [formData]
  );

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[name];
      return nextErrors;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = buildErrors(formData);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitState({
        status: 'error',
        message: 'Review the highlighted fields before submitting.',
      });
      return;
    }

    setSubmitState({ status: 'submitting', message: 'Submitting application...' });

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || 'Unable to submit the application.');
      }

      setSubmitState({
        status: 'success',
        message: payload.message,
      });
      setFormData(initialFormState);
      setErrors({});
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: error.message,
      });
    }
  }

  return (
    <div className="application-grid">
      <section className="panel hero-panel">
        <p className="eyebrow">Structured intake</p>
        <h1>Application form</h1>
        <p className="hero-copy">
          Capture applicant details, availability, and intent in one concise workflow built on the AIS-FB
          repository structure.
        </p>
        <div className="hero-metrics" aria-label="Application workflow summary">
          <article>
            <strong>4</strong>
            <span>Review checkpoints</span>
          </article>
          <article>
            <strong>1 day</strong>
            <span>Target triage turnaround</span>
          </article>
          <article>
            <strong>API ready</strong>
            <span>Mock submission endpoint included</span>
          </article>
        </div>
      </section>

      <section className="panel form-panel">
        <div className="section-heading">
          <h2>Applicant details</h2>
          <p>Required fields are validated before the mock submission request is sent.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <label>
              <span>First name</span>
              <input name="firstName" value={formData.firstName} onChange={handleChange} />
              {errors.firstName ? <small className="error-text">{errors.firstName}</small> : null}
            </label>

            <label>
              <span>Last name</span>
              <input name="lastName" value={formData.lastName} onChange={handleChange} />
              {errors.lastName ? <small className="error-text">{errors.lastName}</small> : null}
            </label>

            <label>
              <span>Email</span>
              <input name="email" type="email" value={formData.email} onChange={handleChange} />
              {errors.email ? <small className="error-text">{errors.email}</small> : null}
            </label>

            <label>
              <span>Phone</span>
              <input name="phone" type="tel" value={formData.phone} onChange={handleChange} />
            </label>

            <label>
              <span>Program</span>
              <select name="program" value={formData.program} onChange={handleChange}>
                {programOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Employment type</span>
              <select name="employmentType" value={formData.employmentType} onChange={handleChange}>
                {employmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Preferred start date</span>
              <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
              {errors.startDate ? <small className="error-text">{errors.startDate}</small> : null}
            </label>

            <label>
              <span>Preferred location</span>
              <select name="location" value={formData.location} onChange={handleChange}>
                {locationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="stacked-field">
            <span>Experience summary</span>
            <textarea
              name="experience"
              rows="4"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Summarise relevant experience, major projects, and core tools."
            />
            {errors.experience ? <small className="error-text">{errors.experience}</small> : null}
          </label>

          <label className="stacked-field">
            <span>Motivation</span>
            <textarea
              name="motivation"
              rows="5"
              value={formData.motivation}
              onChange={handleChange}
              placeholder="Explain why you are applying and what outcome you want from the role."
            />
            {errors.motivation ? <small className="error-text">{errors.motivation}</small> : null}
          </label>

          <label className="checkbox-field">
            <input
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <span>I confirm that the information provided is accurate and ready for review.</span>
          </label>
          {errors.agreeToTerms ? <small className="error-text">{errors.agreeToTerms}</small> : null}

          <div className="form-actions">
            <button type="submit" className="primary-button" disabled={submitState.status === 'submitting'}>
              {submitState.status === 'submitting' ? 'Submitting...' : 'Submit application'}
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setFormData(initialFormState);
                setErrors({});
                setSubmitState({ status: 'idle', message: '' });
              }}
            >
              Reset form
            </button>
          </div>

          {submitState.message ? (
            <p className={`status-banner status-banner--${submitState.status}`}>{submitState.message}</p>
          ) : null}
        </form>
      </section>

      <aside className="panel summary-panel">
        <div className="section-heading">
          <h2>Application snapshot</h2>
          <p>Live preview to support quick review before submission.</p>
        </div>

        <dl className="preview-list">
          {applicationPreview.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="checklist-card">
          <h3>Before you submit</h3>
          <ul>
            <li>Match the program to the role intake stream.</li>
            <li>Provide enough project detail for triage.</li>
            <li>Confirm the applicant is available for the preferred start date.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}