// src/components/forms/ContactForm.tsx
// Форма контактов (Astro Island с защитой)

import { useState } from 'react';
import { isValidEmail, isValidPhone } from '@/lib/utils';

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
  acceptTerms: boolean;
  website?: string; // honeypot
  faxNumber?: string; // honeypot
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: '',
    acceptTerms: false,
    website: '',
    faxNumber: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [submitTime] = useState(Date.now());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Защита от спама: honeypot поля
    if (formData.website || formData.faxNumber) {
      // Молча игнорируем - это бот
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      return;
    }

    // Проверка времени заполнения (минимум 3 секунды)
    const fillTime = (Date.now() - submitTime) / 1000;
    if (fillTime < 3) {
      setError('Пожалуйста, внимательнее заполните форму');
      return;
    }

    // Валидация
    if (!formData.name || formData.name.length < 2) {
      setError('Укажите корректное имя');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError('Укажите корректный email');
      return;
    }

    if (!isValidPhone(formData.phone)) {
      setError('Укажите корректный номер телефона');
      return;
    }

    if (!formData.message || formData.message.length < 5) {
      setError('Сообщение должно быть не менее 5 символов');
      return;
    }

    if (!formData.acceptTerms) {
      setError('Согласитесь на обработку персональных данных');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          city: '',
          message: '',
          acceptTerms: false,
          website: '',
          faxNumber: '',
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('Ошибка отправки. Пожалуйста, попробуйте позже.');
      }
    } catch (err) {
      setError('Ошибка соединения. Проверьте интернет.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {submitted && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          ✓ Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          ⚠ {error}
        </div>
      )}

      {/* Honeypot fields - скрытые */}
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />
      <input
        type="text"
        name="faxNumber"
        value={formData.faxNumber}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Ваше имя <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Иван Петров"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ivan@example.com"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold mb-2">
            Телефон <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+7 (905) 386-08-70"
            required
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-semibold mb-2">
            Город / регион
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Саратов"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold mb-2">
          Сообщение <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Расскажите о вашем вопросе или заказе..."
          rows={5}
          required
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="acceptTerms"
          name="acceptTerms"
          checked={formData.acceptTerms}
          onChange={handleChange}
          required
          className="w-5 h-5 mt-1"
        />
        <label htmlFor="acceptTerms" className="text-sm">
          Я согласен на обработку персональных данных и получение информации от SARPRO
          <span className="text-red-500">*</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-accent-light text-white py-3 px-4 rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Отправка...' : 'Отправить'}
      </button>
    </form>
  );
}
