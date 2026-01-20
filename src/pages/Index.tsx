import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import html2canvas from 'html2canvas';

const carouselData = [
  {
    id: 1,
    type: 'intro',
    title: 'Каким был сезон новогодних каникул в начале 2026 года',
    subtitle: 'Делюсь статистическими данными «Авито Путешествия», «Яндекс Путешествия» и «Островок».'
  },
  {
    id: 2,
    type: 'text',
    title: 'Рост туристического потока по России',
    content: 'Туристический поток по России за 2025 год вырос на 4,8%, до 76,2 млн поездок.',
    stats: [
      { label: 'Москва', value: '10,3 млн человек' },
      { label: 'Краснодарский край', value: '8,3 млн' },
      { label: 'Санкт-Петербург', value: '6 млн' }
    ],
    additional: 'В десятку наиболее популярных регионов входят: Московская область (4,7 млн), Республика Татарстан (2,4 млн), Республика Крым (2,2 млн), Свердловская область (1,7 млн), Ставропольский край, а также Тюменская и Ростовская области (по 1,5 млн каждая).'
  },
  {
    id: 3,
    type: 'text',
    title: 'Влияние на краткосрочную аренду',
    content: 'Рост внутреннего туристского потока напрямую влияет на краткосрочную аренду. Растет не только общее число бронирований, но и средняя стоимость проживания.',
    highlight: 'Активнее всего посуточные квартиры отдыхающие бронировали в Москве, Санкт-Петербурге, Казани, Сочи и Краснодаре.'
  },
  {
    id: 4,
    type: 'bar-chart',
    title: 'Лидеры по числу туристических поездок',
    subtitle: 'с 30.12.2025 по 12.01.2026',
    data: [
      { region: 'Москва', value: 10.3 },
      { region: 'Краснодарский край', value: 8.3 },
      { region: 'Санкт-Петербург', value: 6.0 },
      { region: 'Московская область', value: 4.7 },
      { region: 'Республика Татарстан', value: 2.4 },
      { region: 'Республика Крым', value: 2.2 },
      { region: 'Свердловская область', value: 1.7 }
    ]
  },
  {
    id: 5,
    type: 'pie-chart',
    title: 'Что бронируют туристы',
    subtitle: 'Среди форматов размещения туристов лидирует именно посуточное жилье',
    data: [
      { label: 'Апартаменты', value: 25, color: '#3B82F6' },
      { label: 'Отели без звезд', value: 22, color: '#60A5FA' },
      { label: 'Гостиницы 3★', value: 19, color: '#93C5FD' },
      { label: 'Гостиницы 4★', value: 14, color: '#BFDBFE' },
      { label: 'Гостевые дома', value: 9, color: '#DBEAFE' },
      { label: 'Отели 2★', value: 4, color: '#EFF6FF' },
      { label: 'Отели 5★', value: 3, color: '#F1F5F9' },
      { label: 'Хостелы', value: 3, color: '#E2E8F0' },
      { label: 'Глэмпинги', value: 1, color: '#CBD5E1' }
    ],
    source: 'Данные «Островка» о бронировании в новогоднем сезоне 2025–2026'
  },
  {
    id: 6,
    type: 'bar-chart-horizontal',
    title: 'Средняя стоимость посуточной аренды квартир',
    subtitle: 'На новогодних праздниках в России',
    note: 'В среднем по стране стоимость посуточной аренды квартиры относительно прошлого года выросла на 7%: с 5,6 тыс. до 6 тыс. ₽ в сутки.',
    data: [
      { city: 'Москва', value: 6600 },
      { city: 'Казань', value: 5800 },
      { city: 'Санкт-Петербург', value: 5600 },
      { city: 'Нижний Новгород', value: 4500 },
      { city: 'Калининград', value: 3800 },
      { city: 'Краснодар', value: 3700 }
    ]
  },
  {
    id: 7,
    type: 'conclusion',
    title: 'Выводы',
    points: [
      'Посуточная аренда остается востребованной, но рынок стал более зрелым. Гости считают деньги и сравнивают варианты.',
      'Для собственников это означает необходимость гибкого ценообразования, работы с качеством сервиса и быстрой реакции на спрос.',
      'Чек за проживание растет ежегодно. Спрос продолжает расти, при этом конкуренция среди способов размещения растет, и нужно более внимательно отнестись к маркетингу, позиционированию и уровню сервиса.'
    ]
  }
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const downloadCard = async (index: number) => {
    const element = cardRefs.current[index];
    if (!element) return;

    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false
    });

    const link = document.createElement('a');
    link.download = `tourism-card-${index + 1}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const renderCard = (slide: typeof carouselData[0], index: number) => {
    switch (slide.type) {
      case 'intro':
        return (
          <div className="h-full flex flex-col justify-center items-center text-center px-12 py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-foreground">
              {slide.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {slide.subtitle}
            </p>
          </div>
        );

      case 'text':
        return (
          <div className="h-full flex flex-col justify-center px-12 py-16 space-y-8">
            <h2 className="text-3xl font-bold text-foreground">{slide.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{slide.content}</p>
            {slide.stats && (
              <div className="space-y-4">
                {slide.stats.map((stat, i) => (
                  <div key={i} className="flex justify-between items-center border-l-4 border-primary pl-6 py-2">
                    <span className="text-base text-foreground font-medium">{stat.label}</span>
                    <span className="text-xl font-mono font-semibold text-primary">{stat.value}</span>
                  </div>
                ))}
              </div>
            )}
            {slide.additional && (
              <p className="text-sm text-muted-foreground leading-relaxed pt-4 border-t">
                {slide.additional}
              </p>
            )}
            {slide.highlight && (
              <div className="bg-primary/5 border-l-4 border-primary px-6 py-4 rounded-r">
                <p className="text-base text-foreground font-medium">{slide.highlight}</p>
              </div>
            )}
          </div>
        );

      case 'bar-chart':
        const maxValue = Math.max(...(slide.data?.map((d) => d.value) || [0]));
        return (
          <div className="h-full flex flex-col justify-center px-12 py-16 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{slide.title}</h2>
              <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
            </div>
            <div className="space-y-6">
              {slide.data?.map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-medium text-foreground">{item.region}</span>
                    <span className="text-lg font-mono font-semibold text-primary">{item.value} млн</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${(item.value / maxValue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'pie-chart':
        return (
          <div className="h-full flex flex-col justify-center px-12 py-16 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{slide.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{slide.subtitle}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {slide.data?.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-sm text-foreground truncate">{item.label}</span>
                      <span className="text-base font-mono font-semibold text-primary flex-shrink-0">
                        {item.value}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {slide.source && (
              <p className="text-xs text-muted-foreground pt-4 border-t">{slide.source}</p>
            )}
          </div>
        );

      case 'bar-chart-horizontal':
        const maxPrice = Math.max(...(slide.data?.map((d) => d.value) || [0]));
        return (
          <div className="h-full flex flex-col justify-center px-12 py-16 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{slide.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{slide.subtitle}</p>
              {slide.note && (
                <p className="text-sm text-foreground bg-primary/5 px-4 py-3 rounded border-l-4 border-primary">
                  {slide.note}
                </p>
              )}
            </div>
            <div className="space-y-5">
              {slide.data?.map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-medium text-foreground">{item.city}</span>
                    <span className="text-lg font-mono font-semibold text-primary">
                      {item.value.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${(item.value / maxPrice) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'conclusion':
        return (
          <div className="h-full flex flex-col justify-center px-12 py-16 space-y-8">
            <h2 className="text-3xl font-bold text-foreground">{slide.title}</h2>
            <div className="space-y-6">
              {slide.points?.map((point, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-mono font-semibold text-primary">{i + 1}</span>
                  </div>
                  <p className="text-base text-foreground leading-relaxed pt-1">{point}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <Card
          ref={(el) => (cardRefs.current[currentSlide] = el)}
          className="relative bg-card shadow-2xl overflow-hidden"
          style={{ aspectRatio: '1 / 1', maxHeight: '90vh' }}
        >
          {renderCard(carouselData[currentSlide], currentSlide)}

          <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4 px-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full bg-card/80 backdrop-blur-sm border-2 hover:bg-card"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>

            <div className="flex gap-2">
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-primary w-8' : 'bg-muted-foreground/30'
                  }`}
                  aria-label={`Перейти к слайду ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full bg-card/80 backdrop-blur-sm border-2 hover:bg-card"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => downloadCard(currentSlide)}
            className="absolute top-6 right-6 rounded-full hover:bg-primary/10"
          >
            <Icon name="Download" size={20} />
          </Button>
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          Карточка {currentSlide + 1} из {carouselData.length}
        </div>
      </div>
    </div>
  );
};

export default Index;
