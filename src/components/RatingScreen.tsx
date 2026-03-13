import { useState } from 'react';
import { ArrowLeft, Info, Heart, Ear, Brain, Lightbulb, MessageCircle } from 'lucide-react';
import { WaterBottle } from './WaterBottle';
import { PageIndicator } from './PageIndicator';

interface RatingBarProps {
  label: string;
  icon: React.ReactNode;
  color: string;
  value: number;
  onChange: (value: number) => void;
}

interface RatingScreenProps {
  onNext: (ratings: {
    understanding: number;
    listening: number;
    emotional: number;
    solutions: number;
    argumentation: number;
  }) => void;
  initialRatings: {
    understanding: number;
    listening: number;
    emotional: number;
    solutions: number;
    argumentation: number;
  };
  onBack?: () => void;
}

function RatingBar({ label, icon, color, value, onChange }: RatingBarProps) {
  const maxRating = 10;
  
  return (
    <div className="flex flex-col items-center gap-4 flex-1">
      <div className="relative w-16 h-64 bg-white rounded-full shadow-lg overflow-hidden">
        {/* Rating segments */}
        {Array.from({ length: maxRating }).map((_, index) => {
          const segmentValue = maxRating - index;
          const isActive = value >= segmentValue;
          
          return (
            <div
              key={index}
              className={`h-[10%] border-b border-slate-100 cursor-pointer transition-all duration-150 ${
                isActive ? color : 'bg-white hover:bg-slate-50'
              }`}
              onClick={() => onChange(segmentValue)}
            />
          );
        })}
      </div>
      <div className="flex flex-col items-center gap-2 max-w-[120px] text-center">
        <div className={`${color.replace('bg-gradient-to-t', 'text').split(' ')[0].replace('from-', '')}`}>
          {icon}
        </div>
        <p className="text-sm leading-tight text-slate-700">
          {label}
        </p>
        <span className="text-xs font-medium text-slate-500">{value}/10</span>
      </div>
    </div>
  );
}

export function RatingScreen({ onNext, initialRatings, onBack }: RatingScreenProps) {
  const [ratings, setRatings] = useState(initialRatings);

  const handleRatingChange = (key: keyof typeof ratings, value: number) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    onNext(ratings);
  };

  const ratingBars = [
    {
      key: 'understanding' as const,
      label: 'Понимание причин конфликта',
      icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: '#A8DF09'
    },
    {
      key: 'listening' as const,
      label: 'Умение выслушать оппонента',
      icon: <Ear className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: '#8195FF'
    },
    {
      key: 'emotional' as const,
      label: 'Эмоциональный контроль',
      icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: '#A56FFD'
    },
    {
      key: 'solutions' as const,
      label: 'Поиск беспроигрышных решений',
      icon: <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: '#FFCD00'
    },
    {
      key: 'argumentation' as const,
      label: 'Аргументация без агрессии',
      icon: <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: '#FF56DD'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-yellow-200/30 blur-xl"></div>
      <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-blue-200/30 blur-xl"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-purple-200/30 blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-pink-200/30 blur-xl"></div>
      
      {/* Decorative shapes */}
      <svg className="absolute top-10 right-40 w-8 h-8 text-purple-300/50" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      <svg className="absolute top-60 left-40 w-6 h-6 text-blue-300/50" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
      </svg>
      <svg className="absolute bottom-60 right-60 w-10 h-10 text-pink-300/50" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>

      {/* Page indicator */}
      <PageIndicator currentPage={2} totalPages={4} />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 mb-4 sm:mb-8">
          <button className="p-2 hover:bg-white/50 rounded-full transition-colors" onClick={onBack}>
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-xl sm:text-2xl tracking-wider text-slate-800 mb-1">
              КОНФЛИКТОЛОГИЯ
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">Оцените образовательный модуль</p>
          </div>
          <button className="p-2 hover:bg-white/50 rounded-full transition-colors">
            <Info className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
          </button>
        </div>

        {/* Main content */}
        <div className="max-w-5xl mx-auto px-3 sm:px-6">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-8 mb-8 sm:mb-12">
            {ratingBars.map((bar) => (
              <WaterBottle
                key={bar.key}
                label={bar.label}
                icon={bar.icon}
                color={bar.color}
                value={ratings[bar.key]}
                onChange={(value) => handleRatingChange(bar.key, value)}
              />
            ))}
          </div>

          {/* Next button */}
          <div className="max-w-md mx-auto px-4">
            <button
              onClick={handleNext}
              style={{ backgroundColor: '#8195FF' }}
              className="w-full py-3 sm:py-4 text-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              Далее →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}