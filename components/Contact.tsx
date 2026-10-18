
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Phone, Check, AlertCircle, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const validateField = (field: keyof FormData, value: string): string | undefined => {
    const trimmed = value.trim();
    if (field === 'name') {
      if (!trimmed) return t('contact.errorName');
      if (trimmed.length < 2) return t('contact.errorName');
    }
    if (field === 'email') {
      if (!trimmed) return t('contact.errorEmailRequired');
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(trimmed)) return t('contact.errorEmailInvalid');
    }
    if (field === 'subject') {
      if (!trimmed) return t('contact.errorSubject');
    }
    if (field === 'message') {
      if (!trimmed) return t('contact.errorMessage');
      if (trimmed.length < 10) return t('contact.errorMessage');
    }
    return undefined;
  };

  const validateAll = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};
    const nameErr = validateField('name', data.name);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateField('email', data.email);
    if (emailErr) newErrors.email = emailErr;

    const subjectErr = validateField('subject', data.subject);
    if (subjectErr) newErrors.subject = subjectErr;

    const messageErr = validateField('message', data.message);
    if (messageErr) newErrors.message = messageErr;

    return newErrors;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    if (touched[field] || submitAttempted) {
      const fieldErr = validateField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: fieldErr,
      }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldErr = validateField(field, formData[field]);
    setErrors((prev) => ({
      ...prev,
      [field]: fieldErr,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    const validationErrors = validateAll(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitted(true);

    // Format WhatsApp message
    const formattedMessage = 
      `*New Contact Message from Portfolio*\n\n` +
      `👤 *Name:* ${formData.name.trim()}\n` +
      `📧 *Email:* ${formData.email.trim()}\n` +
      `📌 *Subject:* ${formData.subject.trim()}\n\n` +
      `💬 *Message:*\n${formData.message.trim()}`;

    const whatsappNumber = '8801941648410';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;

    // Open WhatsApp in a new tab or app
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setTouched({
      name: false,
      email: false,
      subject: false,
      message: false,
    });
    setSubmitAttempted(false);
    setErrors({});

    setTimeout(() => setSubmitted(false), 4500);
  };

  return (
    <section id="contact" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
              {t('contact.title1')} <br /><span className="text-indigo-600 dark:text-indigo-500">{t('contact.title2')}</span> {t('contact.title3')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed text-lg">
              {t('contact.subtitle')}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400">
                  <MessageSquare className="w-6 h-6" />
                </div>
               
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold mb-1">WhatsApp</h4>
                  <a 
                    href="https://wa.me/8801941648410" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                  >
                    +88 01941648410
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
                  <Phone className="w-6 h-6" />
                </div>
               
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold mb-1">{t('contact.callMe')}</h4>
                  <a href="tel:+8801941648410" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">+88 01941648410</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <a 
                  href="mailto:mdshamim.en@gmail.com" 
                  aria-label="Send email to mdshamim.en@gmail.com"
                  className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </a>
               
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold mb-1">{t('contact.emailMe')}</h4>
                  <a href="mailto:mdshamim.en@gmail.com" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">mdshamim.en@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold mb-1">{t('contact.location')}</h4>
                  <p className="text-slate-600 dark:text-slate-400">{t('contact.locationVal')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl dark:shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-[60px]"></div>
            
            <form id="contact-form" noValidate className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-2">
                    {t('contact.nameLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    id="contact-name"
                    type="text" 
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    aria-invalid={Boolean((touched.name || submitAttempted) && errors.name)}
                    className={`w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-all ${
                      (touched.name || submitAttempted) && errors.name
                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50 bg-red-50/20 dark:bg-red-950/10'
                        : 'border-slate-300 dark:border-slate-700 focus:border-indigo-500'
                    }`}
                    placeholder={t('contact.namePlaceholder')}
                  />
                  <AnimatePresence>
                    {(touched.name || submitAttempted) && errors.name && (
                      <motion.p 
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-2">
                    {t('contact.emailLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    id="contact-email"
                    type="email" 
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    aria-invalid={Boolean((touched.email || submitAttempted) && errors.email)}
                    className={`w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-all ${
                      (touched.email || submitAttempted) && errors.email
                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50 bg-red-50/20 dark:bg-red-950/10'
                        : 'border-slate-300 dark:border-slate-700 focus:border-indigo-500'
                    }`}
                    placeholder={t('contact.emailPlaceholder')}
                  />
                  <AnimatePresence>
                    {(touched.email || submitAttempted) && errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-2">
                  {t('contact.subjectLabel')} <span className="text-red-500">*</span>
                </label>
                <input 
                  id="contact-subject"
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  onBlur={() => handleBlur('subject')}
                  aria-invalid={Boolean((touched.subject || submitAttempted) && errors.subject)}
                  className={`w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-all ${
                    (touched.subject || submitAttempted) && errors.subject
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50 bg-red-50/20 dark:bg-red-950/10'
                      : 'border-slate-300 dark:border-slate-700 focus:border-indigo-500'
                  }`}
                  placeholder={t('contact.subjectPlaceholder')}
                />
                <AnimatePresence>
                  {(touched.subject || submitAttempted) && errors.subject && (
                    <motion.p 
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.subject}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-2">
                  {t('contact.messageLabel')} <span className="text-red-500">*</span>
                </label>
                <textarea 
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  aria-invalid={Boolean((touched.message || submitAttempted) && errors.message)}
                  className={`w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-all resize-none ${
                    (touched.message || submitAttempted) && errors.message
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50 bg-red-50/20 dark:bg-red-950/10'
                      : 'border-slate-300 dark:border-slate-700 focus:border-indigo-500'
                  }`}
                  placeholder={t('contact.messagePlaceholder')}
                ></textarea>
                <AnimatePresence>
                  {(touched.message || submitAttempted) && errors.message && (
                    <motion.p 
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <button 
                id="contact-submit-btn"
                type="submit"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/25 group cursor-pointer active:scale-98"
              >
                {submitted ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-200" />
                    <span>{t('contact.sent')}</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{t('contact.send')}</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

