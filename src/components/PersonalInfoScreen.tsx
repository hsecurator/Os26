import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { PageIndicator } from './PageIndicator';

interface PersonalInfoScreenProps {
  onNext: (data: { name: string; program: string }) => void;
  initialData?: { name: string; program: string };
}

const educationalPrograms = [
  'Бизнес-информатика',
  'Маркетинг и рыночная аналитика',
  'Международный бизнес',
  'Технологии анализа данных в бизнесе',
  'Управление бизнесом',
  'Управление цифровым продуктом',
  'Античность',
  'Монголия и Тибет',
  'Турция и тюркский мир',
  'Эфиопия и арабский мир',
  'Япония: язык, история, литература, культура',
  'Международная программа по экономике и финансам',
  'Информатика и вычислительная техника',
  'Компьютерная безопасность',
  'Прикладная математика',
  'Инфокоммуникационные технологии и системы связи',
  'Информационная безопасность',
  'Клеточная и молекулярная биоте��нология',
  'Когнитивная нейробиология',
  'География глобальных изменений и геоинформационные технологии',
  'Городское планирование',
  'Программа двух дипломов НИУ ВШЭ и РУТ «Экономика и инженерия транспортных систем»',
  'История',
  'История искусств',
  'Культурология',
  'Филология',
  'Практическая философия',
  'Фундаментальная и компьютерная лингвистика',
  'Дизайн и разработка информационных продуктов',
  'Компьютерные науки и анализ данных',
  'Прикладная математика и информатика',
  'Прикладной анализ данных',
  'Программная инженерия',
  'Разработка игр и цифровых продуктов',
  'Экономика и анализ данных',
  'Актёр',
  'Глобальные цифровые коммуникации',
  'Журналистика',
  'Кинопроизводство',
  'Медиакоммуникации',
  'Реклама и связи с общественностью',
  'Стратегия и продюсирование в коммуникациях',
  'Управление в креативных индустриях',
  'Дизайн',
  'Мода',
  'Современное искусство',
  'Математика',
  'Совместный бакалавриат НИУ ВШЭ и ЦПМ',
  'Востоковедение',
  'Международные отношения',
  'Международные отношения и глобальные исследования',
  'Мировая экономика',
  'Программа двух дипломов НИУ ВШЭ и Университета Кёнхи «Экономика и политика в Азии»',
  'Юриспруденция',
  'Юриспруденция: цифровой юрист',
  'Вычислительные социальные науки',
  'Государственное и муниципальное управление',
  'Политология',
  'Психология',
  'Социология',
  'Физика',
  'Химия',
  'Химия новых материалов',
  'Совместная программа НИУ ВШЭ и РЭШ',
  'Экономика',
  'Экономика и статистика',
  'Экономический анализ',
  'Иностранные языки и межкультурная коммуникация'
];

export function PersonalInfoScreen({ onNext, initialData }: PersonalInfoScreenProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [program, setProgram] = useState(initialData?.program || '');

  const handleNext = () => {
    if (!name.trim() || !program) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    onNext({ name, program });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-yellow-200/30 blur-xl"></div>
      <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-blue-200/30 blur-xl"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-purple-200/30 blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-pink-200/30 blur-xl"></div>

      {/* Page indicator */}
      <PageIndicator currentPage={1} totalPages={4} />

      {/* Back arrow (disabled on this page) */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <button 
          disabled
          className="p-2 rounded-full transition-colors opacity-30 cursor-not-allowed"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
        </button>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl text-slate-800 mb-2 sm:mb-3">
              Персональная информация
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Пожалуйста, заполните информацию о себе
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5 sm:space-y-6">
            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-slate-700 mb-2 text-sm sm:text-base">
                ФИО
              </label>
              <input
                id="fullName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введите ваше ФИО"
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Educational Program Select */}
            <div>
              <label htmlFor="program" className="block text-slate-700 mb-2 text-sm sm:text-base">
                Образовательная программа
              </label>
              <select
                id="program"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors bg-white"
              >
                <option value="">Выберите программу</option>
                {educationalPrograms.map((prog) => (
                  <option key={prog} value={prog}>
                    {prog}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Next button */}
          <div className="mt-6 sm:mt-8">
            <button
              onClick={handleNext}
              style={{ backgroundColor: '#8195FF' }}
              className="w-full py-3 sm:py-4 text-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 text-sm sm:text-base"
            >
              Далее →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}