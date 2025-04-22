import React, { useState } from 'react';
import { Plane as Plant, Globe, HelpCircle, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  
  const languages = [
    'English',
    'Español',
    'Français',
    '中文',
    'हिन्दी',
    'العربية'
  ];
  
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };
  
  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(prev => !prev);
  };
  
  const selectLanguage = (language: string) => {
    setCurrentLanguage(language);
    setLanguageMenuOpen(false);
  };
  
  return (
    <header className="bg-gradient-to-r from-green-800 to-green-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Plant className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold text-white">CropGuard AI</span>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-green-200 font-medium">Dashboard</a>
            <a href="#" className="text-white hover:text-green-200 font-medium">History</a>
            <a href="#" className="text-white hover:text-green-200 font-medium">Knowledge Base</a>
            
            {/* Language selector */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center text-white hover:text-green-200 focus:outline-none"
                onClick={toggleLanguageMenu}
              >
                <Globe className="w-5 h-5 mr-1" />
                <span>{currentLanguage}</span>
              </button>
              
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {languages.map((language) => (
                      <button
                        key={language}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          language === currentLanguage
                            ? 'bg-green-100 text-green-900'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => selectLanguage(language)}
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <HelpCircle className="w-5 h-5 mr-1" />
              Help
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white hover:text-green-200 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-green-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-600"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-600"
            >
              History
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-600"
            >
              Knowledge Base
            </a>
            
            {/* Mobile language selector */}
            <div className="px-3 py-2">
              <button
                type="button"
                className="flex items-center text-white hover:text-green-200 focus:outline-none"
                onClick={toggleLanguageMenu}
              >
                <Globe className="w-5 h-5 mr-1" />
                <span>{currentLanguage}</span>
              </button>
            </div>
            
            <button
              type="button"
              className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-600"
            >
              <HelpCircle className="w-5 h-5 mr-1" />
              Help
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;