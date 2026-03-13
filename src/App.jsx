/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, ChevronLeft } from 'lucide-react';
import gamesData from './games.json';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(gamesData.map(g => g.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setSelectedGame(null)}
          >
            <div className="bg-emerald-500 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">
              UNBLOCKED<span className="text-emerald-500">GAMES</span>
            </h1>
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search games..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="hidden md:flex items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-emerald-500 text-black' 
                    : 'hover:bg-white/10 text-white/60 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {selectedGame ? (
          /* Game Player View */
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedGame(null)}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Library
              </button>
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">{selectedGame.title}</h2>
                <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-white/60 uppercase tracking-wider">
                  {selectedGame.category}
                </span>
              </div>
            </div>

            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-500/5">
              <iframe
                src={selectedGame.url}
                className="w-full h-full border-none"
                title={selectedGame.title}
                allowFullScreen
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-lg font-semibold">About {selectedGame.title}</h3>
                <p className="text-white/60 leading-relaxed">
                  Enjoy {selectedGame.title} unblocked! This is a classic {selectedGame.category.toLowerCase()} game that you can play directly in your browser without any restrictions. Simple controls, addictive gameplay, and completely free.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                <h4 className="font-medium text-emerald-500">Game Info</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/40">Category</span>
                    <span>{selectedGame.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Platform</span>
                    <span>Web Browser</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Status</span>
                    <span className="text-emerald-400">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Game Library Grid */
          <div className="space-y-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold tracking-tight">Game Library</h2>
              <p className="text-white/40">Discover and play the best unblocked games.</p>
            </div>

            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => setSelectedGame(game)}
                    className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-all cursor-pointer hover:-translate-y-1"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    </div>
                    
                    <div className="p-4 relative">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-lg group-hover:text-emerald-400 transition-colors">
                            {game.title}
                          </h3>
                          <span className="text-xs text-white/40 uppercase tracking-widest font-medium">
                            {game.category}
                          </span>
                        </div>
                        <div className="bg-emerald-500/10 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="w-4 h-4 text-emerald-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8 text-white/20" />
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-medium">No games found</p>
                  <p className="text-white/40">Try adjusting your search or category filters.</p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="text-emerald-500 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-white/10 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-emerald-500" />
            <span className="font-bold tracking-tight">UNBLOCKED GAMES</span>
          </div>
          <div className="flex gap-8 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>
          <p className="text-sm text-white/20">
            © 2026 Unblocked Games Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

