'use client';

interface GoogleReviewsProps {
  /**
   * URL de tu Google Business Profile
   * Ejemplo: "https://www.google.com/maps/place/VLanguret+Design+Build+LLC/@33.3062,-111.8413"
   */
  googleBusinessUrl?: string;
  
  /**
   * Modo de visualización
   * - 'iframe': Muestra un iframe con Google Maps y reseñas (sin API key)
   * - 'link': Solo muestra un link elegante a Google Reviews
   */
  mode?: 'iframe' | 'link';
}

const GoogleReviews = ({ 
  googleBusinessUrl = 'https://www.google.com/maps/place/Vlanguret+Design+Build+LLC/@33.4044127,-111.980022,17z/data=!3m1!4b1!4m6!3m5!1s0x4e69ec1a40984941:0xa7e319a0f192ee4d!8m2!3d33.4044082!4d-111.9774471!16s%2Fg%2F11rn4rk9w1?entry=ttu',
  mode = 'iframe'
}: GoogleReviewsProps) => {

  // Modo Link - Muestra un botón elegante que lleva a Google Reviews
  if (mode === 'link') {
    return (
      <div className="bg-white rounded-lg p-12 sm:p-16 border border-wood-200">
        <div className="text-center">
          <div className="mb-6">
            <svg className="w-16 h-16 text-wood-400 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-wood-800 mb-4">
            Read Our Google Reviews
          </h3>
          
          <p className="font-serif text-lg sm:text-xl text-wood-700 mb-8 leading-relaxed">
            See what our clients are saying about us on Google. We&apos;re proud of our 5-star ratings and customer feedback.
          </p>
          
          <div className="flex justify-center space-x-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          
          <a
            href={googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-wood-800 hover:bg-wood-900 text-white px-8 py-4 font-serif text-sm font-semibold tracking-widest uppercase transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            View on Google
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  // Modo Iframe - Muestra Google Maps con reseñas directamente (sin API key)
  if (mode === 'iframe') {
    // URL del embed de Google Maps - Para obtenerla:
    // 1. Ve a tu perfil en Google Maps
    // 2. Haz clic en "Compartir" > "Insertar un mapa"
    // 3. Copia el código iframe y pega la URL aquí
    // Por ahora, construimos la URL basada en la información de la URL original
    const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.123456789!2d-111.9774471!3d33.4044082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4e69ec1a40984941%3A0xa7e319a0f192ee4d!2sVlanguret%20Design%20Build%20LLC!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus`;
    
    return (
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-wood-200 overflow-hidden">
        <iframe
          src={embedUrl}
          width="100%"
          height="600"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full rounded-lg mb-6"
          title="Google Maps - Vlanguret Design Build LLC"
        />
        <div className="text-center">
          <a
            href={googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-wood-800 hover:bg-wood-900 text-white px-8 py-4 font-serif text-sm font-semibold tracking-widest uppercase transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            View Reviews
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    );
  }
};

export default GoogleReviews;

