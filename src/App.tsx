import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Sphere } from './components/Sphere';
import { CommentsScreen } from './components/CommentsScreen';
import { RatingScreen } from './components/RatingScreen';
import { PersonalInfoScreen } from './components/PersonalInfoScreen';
import { PageIndicator } from './components/PageIndicator';
import { PageTransition } from './components/PageTransition';

interface SphereData {
  id: number;
  text: string;
  size: number;
  position: { x: number; y: number };
}

type SphereState = 'green' | 'yellow' | 'red';

export default function App() {
  const spheresData: SphereData[] = [
    {
      id: 1,
      text: 'Виды и причины конфликтов',
      size: 220,
      position: { x: 15, y: 25 }
    },
    {
      id: 2,
      text: 'Методы решения конфликтов',
      size: 220,
      position: { x: 60, y: 20 }
    },
    {
      id: 3,
      text: 'Метод ухода от конфликта',
      size: 220,
      position: { x: 25, y: 70 }
    },
    {
      id: 4,
      text: 'Восприятие слов по методу ННО',
      size: 220,
      position: { x: 70, y: 65 }
    },
    {
      id: 5,
      text: 'Роль медиатора и посредничество',
      size: 220,
      position: { x: 45, y: 45 }
    }
  ];

  const [currentScreen, setCurrentScreen] = useState<'personal' | 'rating' | 'spheres' | 'comments'>('personal');
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [sphereStates, setSphereStates] = useState<Record<number, SphereState>>({
    1: 'green',
    2: 'red',
    3: 'yellow',
    4: 'green',
    5: 'yellow'
  });
  const [ratings, setRatings] = useState({
    understanding: 7,
    listening: 6,
    emotional: 8,
    solutions: 5,
    argumentation: 7
  });
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    program: ''
  });

  const handleSphereClick = (id: number) => {
    setSphereStates(prev => {
      const currentState = prev[id];
      let nextState: SphereState;
      
      if (currentState === 'green') {
        nextState = 'yellow';
      } else if (currentState === 'yellow') {
        nextState = 'red';
      } else {
        nextState = 'green';
      }
      
      return { ...prev, [id]: nextState };
    });
  };

  const handlePersonalInfoNext = (data: { name: string; program: string }) => {
    setPersonalInfo(data);
    setDirection('forward');
    setCurrentScreen('rating');
  };

  const handleRatingNext = (newRatings: typeof ratings) => {
    setRatings(newRatings);
    setDirection('forward');
    setCurrentScreen('spheres');
  };

  const handleSpheresNext = () => {
    setDirection('forward');
    setCurrentScreen('comments');
  };

  const handleSubmit = async (comments: Record<number, string>) => {
    // Prepare all data for submission
    const allData = {
      name: personalInfo.name,
      program: personalInfo.program,
      ratings,
      sphereStates,
      comments
    };
    
    console.log('Submitted all data:', allData);
    
    // Send data to server
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(allData),
      });
      
      if (response.ok) {
        alert('Спасибо! Все ваши ответы отправлены.');
      } else {
        alert('Ошибка при отправке данных. Пожалуйста, попробуйте снова.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Ошибка при отправке данных. Данные сохранены в консоли.');
    }
    
    // Reset to first screen
    setCurrentScreen('personal');
  };

  if (currentScreen === 'personal') {
    return (
      <AnimatePresence mode="wait">
        <PageTransition key="personal" direction={direction}>
          <PersonalInfoScreen onNext={handlePersonalInfoNext} initialData={personalInfo} />
        </PageTransition>
      </AnimatePresence>
    );
  }

  if (currentScreen === 'rating') {
    return (
      <AnimatePresence mode="wait">
        <PageTransition key="rating" direction={direction}>
          <RatingScreen 
            onNext={handleRatingNext} 
            initialRatings={ratings}
            onBack={() => {
              setDirection('backward');
              setCurrentScreen('personal');
            }}
          />
        </PageTransition>
      </AnimatePresence>
    );
  }

  if (currentScreen === 'comments') {
    return (
      <AnimatePresence mode="wait">
        <PageTransition key="comments" direction={direction}>
          <CommentsScreen
            spheresData={spheresData}
            sphereStates={sphereStates}
            onSubmit={handleSubmit}
            onBack={() => {
              setDirection('backward');
              setCurrentScreen('spheres');
            }}
          />
        </PageTransition>
      </AnimatePresence>
    );
  }

  // Spheres screen
  return (
    <AnimatePresence mode="wait">
      <PageTransition key="spheres" direction={direction}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 relative overflow-hidden">
          {/* Page indicator */}
          <PageIndicator currentPage={3} totalPages={4} />

          {/* Back arrow - DISABLED (visual only) */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
            <button
              disabled
              className="p-2 rounded-full transition-colors opacity-30 cursor-not-allowed"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* Header with instructions */}
          <div className="absolute top-0 left-0 right-0 z-10 p-4 sm:p-8 pt-16 sm:pt-20">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-slate-800">Оценка понимания материала</h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Нажмите на каждую сферу, чтобы указать ваш уровень понимания темы:
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mt-3 sm:mt-4 mb-4 sm:mb-6">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-lg" style={{ backgroundColor: '#A8DF09' }}></div>
                  <span className="text-slate-700 text-xs sm:text-sm">Понятно</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-lg" style={{ backgroundColor: '#FFCD00' }}></div>
                  <span className="text-slate-700 text-xs sm:text-sm">Требует повторения</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-lg" style={{ backgroundColor: '#FF5689' }}></div>
                  <span className="text-slate-700 text-xs sm:text-sm">Непонятно</span>
                </div>
              </div>
            </div>
          </div>

          {/* Spheres - moved lower on mobile */}
          <div className="pt-[20px] sm:pt-0">
            {spheresData.map((sphere) => (
              <Sphere
                key={sphere.id}
                text={sphere.text}
                size={sphere.size}
                position={sphere.position}
                state={sphereStates[sphere.id]}
                onClick={() => handleSphereClick(sphere.id)}
              />
            ))}
          </div>

          {/* Next button */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-8">
            <div className="max-w-3xl mx-auto text-center">
              <button
                onClick={handleSpheresNext}
                style={{ backgroundColor: '#8195FF' }}
                className="px-6 sm:px-8 py-3 sm:py-4 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 text-sm sm:text-base"
              >
                Далее →
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
    </AnimatePresence>
  );
}