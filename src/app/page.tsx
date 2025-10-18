export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-yellow-55 text-dark-08 p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-display font-bold mb-2">
            Blog Future Tech
          </h1>
          <p className="text-dark-20 text-lg font-sans">
            Design System v4.1 - Kumbh Sans + Inter
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6 space-y-12">
        {/* Typography Showcase */}
        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-dark-08">
            Typography System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-xl font-display font-semibold text-dark-15">
                Kumbh Sans (Display)
              </h3>
              <h1 className="text-4xl font-display font-bold text-dark-08">
                Heading 1
              </h1>
              <h2 className="text-3xl font-display font-semibold text-dark-10">
                Heading 2
              </h2>
              <h3 className="text-2xl font-display font-medium text-dark-15">
                Heading 3
              </h3>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-display font-semibold text-dark-15">
                Inter (Body)
              </h3>
              <p className="text-lg font-sans text-dark-20">
                Large paragraph text
              </p>
              <p className="text-base font-sans text-dark-25">
                Regular paragraph text
              </p>
              <p className="text-sm font-sans text-dark-30">
                Small text for captions
              </p>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-dark-08">
            Color Palette
          </h2>

          {/* Yellow Shades */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-semibold text-dark-15">
              Yellow Shades
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              <div className="space-y-2">
                <div className="w-full h-16 bg-yellow-55 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">55</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-yellow-60 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">60</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-yellow-70 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">70</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-yellow-80 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">80</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-yellow-90 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">90</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-yellow-95 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">95</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-yellow-97 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">97</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-yellow-99 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">99</p>
              </div>
            </div>
          </div>

          {/* Dark Shades */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-semibold text-dark-15">
              Dark Shades
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              <div className="space-y-2">
                <div className="w-full h-16 bg-dark-08 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">08</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-dark-10 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">10</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-dark-15 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">15</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-dark-20 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">20</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-dark-25 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">25</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-dark-30 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">30</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-dark-35 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">35</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-dark-40 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">40</p>
              </div>
            </div>
          </div>

          {/* Grey Shades */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-semibold text-dark-15">
              Grey Shades
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              <div className="space-y-2">
                <div className="w-full h-16 bg-grey-50 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">50</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-grey-60 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">60</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-grey-70 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">70</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-grey-75 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">75</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-grey-90 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">90</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-grey-95 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">95</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-grey-97 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">97</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-grey-99 rounded-lg shadow-sm"></div>
                <p className="text-xs font-sans text-center text-dark-30">99</p>
              </div>
            </div>
          </div>
        </section>

        {/* Component Examples */}
        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-dark-08">
            Components
          </h2>

          {/* Buttons */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-semibold text-dark-15">
              Buttons
            </h3>
            <div className="flex flex-wrap gap-4">
              <button className="bg-yellow-55 hover:bg-yellow-60 text-dark-08 px-6 py-3 rounded-lg font-sans font-medium shadow-md transition-colors">
                Primary Button
              </button>
              <button className="bg-dark-08 hover:bg-dark-15 text-white px-6 py-3 rounded-lg font-sans font-medium shadow-md transition-colors">
                Dark Button
              </button>
              <button className="bg-grey-95 hover:bg-grey-90 text-dark-20 px-6 py-3 rounded-lg font-sans font-medium shadow-md transition-colors border border-grey-75">
                Light Button
              </button>
              <button className="border-2 border-yellow-55 text-dark-08 hover:bg-yellow-55 px-6 py-3 rounded-lg font-sans font-medium transition-colors">
                Outline Button
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-semibold text-dark-15">
              Cards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-grey-90">
                <h4 className="text-lg font-display font-semibold text-dark-08 mb-3">
                  Blog Post Card
                </h4>
                <p className="text-dark-30 font-sans mb-4">
                  Using our new design system with Kumbh Sans for headings and
                  Inter for body text.
                </p>
                <button className="bg-yellow-55 hover:bg-yellow-60 text-dark-08 px-4 py-2 rounded-md text-sm font-sans font-medium transition-colors">
                  Read More
                </button>
              </div>

              <div className="bg-gradient-to-br from-yellow-55 to-yellow-70 rounded-xl shadow-lg p-6 text-dark-08">
                <h4 className="text-lg font-display font-semibold mb-3">
                  Featured Article
                </h4>
                <p className="text-dark-20 font-sans mb-4">
                  Gradient card using our yellow color palette from the Figma
                  design system.
                </p>
                <button className="bg-dark-08 hover:bg-dark-15 text-white px-4 py-2 rounded-md text-sm font-sans font-medium transition-colors">
                  Learn More
                </button>
              </div>

              <div className="bg-grey-99 rounded-xl shadow-lg p-6 border border-grey-95">
                <h4 className="text-lg font-display font-semibold text-dark-08 mb-3">
                  Tech News
                </h4>
                <p className="text-dark-30 font-sans mb-4">
                  Light theme card with subtle grey background and proper
                  contrast ratios.
                </p>
                <button className="bg-dark-20 hover:bg-dark-25 text-white px-4 py-2 rounded-md text-sm font-sans font-medium transition-colors">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-dark-08 text-white p-8 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-display font-semibold mb-2">
            Design System Complete
          </h3>
          <p className="text-grey-70 font-sans">
            Tailwind CSS v4.1 + Figma Colors + Kumbh Sans + Inter
          </p>
          <p className="text-grey-75 font-sans text-sm mt-2">
            All colors and typography configured in globals.css
          </p>
        </div>
      </footer>
    </div>
  );
}
