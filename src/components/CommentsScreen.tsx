import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { PageIndicator } from './PageIndicator';

interface SphereData {
  id: number;
  text: string;
  size: number;
  position: { x: number; y: number };
}

type SphereState = 'green' | 'yellow' | 'red';

interface CommentsScreenProps {
  spheresData: SphereData[];
  sphereStates: Record<number, SphereState>;
  onSubmit: (comments: Record<number, string>) => void;
  onBack: () => void;
}

const stateColors = {
  green: '#A8DF09',
  yellow: '#FFCD00',
  red: '#FF5689'
};

const stateLabels = {
  green: 'Понятно',
  yellow: 'Требует повторения',
  red: 'Непонятно'
};

export function CommentsScreen({ spheresData, sphereStates, onSubmit, onBack }: CommentsScreenProps) {
  const [comments, setComments] = useState<Record<number, string>>({});

  const handleCommentChange = (id: number, value: string) => {
    setComments(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    onSubmit(comments);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 py-4 sm:py-8 px-3 sm:px-4 relative">
      {/* Page indicator */}
      <PageIndicator currentPage={4} totalPages={4} />

      {/* Back arrow */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/50 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="max-w-4xl mx-auto pt-12 sm:pt-0">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl text-slate-800 mb-2 sm:mb-3">Ваши комментарии</h1>
          <p className="text-base sm:text-lg text-slate-600">
            Пожалуйста, добавьте комментарии к темам, которые требуют дополнительного внимания
          </p>
        </div>

        {/* Comments form */}
        <div className="space-y-4 sm:space-y-6">
          {spheresData.map((sphere) => {
            const state = sphereStates[sphere.id];
            const color = stateColors[state];
            const label = stateLabels[state];

            return (
              <div
                key={sphere.id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0 shadow-md"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div className="flex-1">
                    <h3 className="text-slate-800 mb-1 text-sm sm:text-base">
                      {sphere.text}
                    </h3>
                    <span className="inline-block px-2 sm:px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs sm:text-sm">
                      {label}
                    </span>
                  </div>
                </div>
                <textarea
                  value={comments[sphere.id] || ''}
                  onChange={(e) => handleCommentChange(sphere.id, e.target.value)}
                  placeholder="Добавьте ваш комментарий (необязательно)..."
                  className="w-full h-20 sm:h-24 p-3 sm:p-4 text-sm sm:text-base border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none transition-colors"
                />
              </div>
            );
          })}
        </div>

        {/* Submit button */}
        <div className="mt-6 sm:mt-8 text-center">
          <button
            onClick={handleSubmit}
            style={{ backgroundColor: '#A8DF09' }}
            className="px-10 sm:px-12 py-3 sm:py-4 text-white text-base sm:text-lg font-medium rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}