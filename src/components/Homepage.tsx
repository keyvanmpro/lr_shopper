interface HomepageProps {
  onNavigateProducts: () => void;
}

export default function Homepage({ onNavigateProducts }: HomepageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Promotion Banner */}
      <div className="bg-red-600 text-white text-center py-2 text-sm font-medium">
        FRENCH DAYS JUSQU'À -50%* 
        <span className="ml-4 font-bold">00 JOURS 21 HEURES 54 MINUTES</span>
      </div>

      {/* Hero Section - French Days */}
      <section className="relative bg-gradient-to-r from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="text-sm text-red-600 font-medium">
                Du 24/09 au 30/09
              </div>
              <div className="space-y-2">
                <h1 className="text-6xl font-bold text-red-600 leading-tight">
                  FRENCH<br />
                  DAYS<sup className="text-2xl">(1)</sup>
                </h1>
                <h2 className="text-3xl font-bold text-red-600">
                  JUSQU'À -50%*
                </h2>
              </div>
              <button 
                onClick={onNavigateProducts}
                className="bg-white text-red-600 border-2 border-red-600 px-6 py-3 rounded-md font-semibold hover:bg-red-600 hover:text-white transition-colors"
              >
                J'en profite
              </button>
              <div className="text-sm text-gray-600">
                <sup>(1)</sup>Les jours français.
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="French Days"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Pills */}
      <section className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={onNavigateProducts}
              className="px-6 py-2 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
            >
              French Days
            </button>
            <button 
              onClick={onNavigateProducts}
              className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium border hover:border-red-600 hover:text-red-600 transition-colors"
            >
              Sélection bordeaux
            </button>
            <button 
              onClick={onNavigateProducts}
              className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium border hover:border-red-600 hover:text-red-600 transition-colors"
            >
              Best-sellers
            </button>
            <button 
              onClick={onNavigateProducts}
              className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium border hover:border-red-600 hover:text-red-600 transition-colors"
            >
              Bons plans
            </button>
            <button 
              onClick={onNavigateProducts}
              className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium border hover:border-red-600 hover:text-red-600 transition-colors"
            >
              Marques à la une
            </button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Nos coups de cœur mode & maison */}
            <div className="bg-blue-50 rounded-lg p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-red-600 mb-4">
                  Nos coups de cœur<br />
                  mode & maison
                </h3>
                <button 
                  onClick={onNavigateProducts}
                  className="text-red-600 font-medium hover:underline"
                >
                  Découvrir →
                </button>
              </div>
              <div className="absolute right-0 top-0 w-48 h-full">
                <img 
                  src="https://images.pexels.com/photos/1375849/pexels-photo-1375849.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Mode & Maison"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
            </div>

            {/* Tendances Automne */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Tendances<br />
                  Automne 2024
                </h3>
                <button 
                  onClick={onNavigateProducts}
                  className="text-red-600 font-medium hover:underline"
                >
                  Voir la sélection →
                </button>
              </div>
              <div className="absolute right-0 top-0 w-48 h-full">
                <img 
                  src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Tendances Automne"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Nos Univers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              onClick={onNavigateProducts}
              className="group cursor-pointer"
            >
              <div className="relative h-80 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
                <img 
                  src="https://images.pexels.com/photos/1375849/pexels-photo-1375849.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Mode Femme"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Mode Femme</h3>
                  <p className="text-sm opacity-90">Découvrez nos dernières collections</p>
                </div>
              </div>
            </div>
            
            <div 
              onClick={onNavigateProducts}
              className="group cursor-pointer"
            >
              <div className="relative h-80 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
                <img 
                  src="https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Mode Homme"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Mode Homme</h3>
                  <p className="text-sm opacity-90">Style et élégance au masculin</p>
                </div>
              </div>
            </div>
            
            <div 
              onClick={onNavigateProducts}
              className="group cursor-pointer"
            >
              <div className="relative h-80 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
                <img 
                  src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Chaussures"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Chaussures</h3>
                  <p className="text-sm opacity-90">Du confort à l'élégance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Livraison gratuite</h3>
              <p className="text-gray-600 text-sm">Dès 49€ d'achat en point relais</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Retours gratuits</h3>
              <p className="text-gray-600 text-sm">30 jours pour changer d'avis</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Paiement sécurisé</h3>
              <p className="text-gray-600 text-sm">CB, PayPal, 3x sans frais</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-9.75 9.75 9.75 9.75 0 019.75-9.75z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Service client</h3>
              <p className="text-gray-600 text-sm">Du lundi au samedi 8h-20h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-red-600 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Restez informé de nos dernières nouveautés
          </h2>
          <p className="text-red-100 mb-8">
            Recevez en avant-première nos offres exclusives et nos conseils mode
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              S'inscrire
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}