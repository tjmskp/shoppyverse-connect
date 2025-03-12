
const ContactMap = () => {
  return (
    <div className="rounded-lg overflow-hidden h-[400px] mb-12">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703802988!2d90.27923991878048!3d23.780573258035954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1621521591886!5m2!1sen!2sus" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen={true}
        loading="lazy"
        title="Map"
      ></iframe>
    </div>
  );
};

export default ContactMap;
