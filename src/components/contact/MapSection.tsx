
export default function MapSection() {
  return (
    <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg border border-orange-100">
      <iframe
        title="Localisation de la boulangerie Le Grain et le Four"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.8155081378025!2d2.3622411156926834!3d48.86483167928792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e0343e73571%3A0x32e45dcdedcd6a1!2sPlace%20de%20la%20R%C3%A9publique%2C%20Paris%2C%20France!5e0!3m2!1sfr!2sfr!4v1620825234915!5m2!1sfr!2sfr"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        className="filter contrast-110 saturate-110"
      ></iframe>
    </div>
  );
}
