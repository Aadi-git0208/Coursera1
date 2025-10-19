import React, { useState } from 'react';

export default function BookingForm() {
  const [form, setForm] = useState({
    date: '',
    time: '',
    guests: 1,
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const newErrors = {};
    if (!form.date) newErrors.date = 'Please select a date.';
    if (!form.time) newErrors.time = 'Please select a time.';
    if (form.guests < 1 || form.guests > 10)
      newErrors.guests = 'Guests must be between 1 and 10.';
    if (!form.name) newErrors.name = 'Name is required.';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'Valid email required.';
    return newErrors;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      setSubmitted(false);
    } else {
      setSubmitted(true);
    }
  }

  return (
    <form aria-label="Booking Form" onSubmit={handleSubmit}>
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        name="date"
        id="date"
        value={form.date}
        onChange={handleChange}
        aria-required="true"
        aria-invalid={!!errors.date}
      />
      {errors.date && <span role="alert">{errors.date}</span>}

      <label htmlFor="time">Time:</label>
      <select
        name="time"
        id="time"
        value={form.time}
        onChange={handleChange}
        aria-required="true"
        aria-invalid={!!errors.time}
      >
        <option value="">Select Time</option>
        <option value="12:00">12:00 PM</option>
        <option value="14:00">2:00 PM</option>
        <option value="18:00">6:00 PM</option>
      </select>
      {errors.time && <span role="alert">{errors.time}</span>}

      <label htmlFor="guests">Number of Guests:</label>
      <input
        type="number"
        name="guests"
        id="guests"
        min="1"
        max="10"
        value={form.guests}
        onChange={handleChange}
        aria-required="true"
        aria-invalid={!!errors.guests}
      />
      {errors.guests && <span role="alert">{errors.guests}</span>}

      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={form.name}
        onChange={handleChange}
        aria-required="true"
        aria-invalid={!!errors.name}
      />
      {errors.name && <span role="alert">{errors.name}</span>}

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        value={form.email}
        onChange={handleChange}
        aria-required="true"
        aria-invalid={!!errors.email}
      />
      {errors.email && <span role="alert">{errors.email}</span>}

      <button type="submit">Book Table</button>
      {submitted && <p>Booking successful! See you soon.</p>}
    </form>
  );
}
