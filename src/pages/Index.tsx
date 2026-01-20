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
          <div className="h-full flex flex-col justify-center items-center text-center px-10 py-12">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight text-foreground">
              {slide.title}
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              {slide.subtitle}
            </p>
          </div>
        );

      case 'text':
        return (
          <div className="h-full flex flex-col justify-center px-10 py-12 space-y-5">
            <h2 className="text-xl font-bold text-foreground">{slide.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{slide.content}</p>
            {slide.stats && (
              <div className="space-y-3">
                {slide.stats.map((stat, i) => (
                  <div key={i} className="flex justify-between items-center border-l-2 border-primary pl-4 py-1">
                    <span className="text-xs text-foreground font-medium">{stat.label}</span>
                    <span className="text-sm font-mono font-semibold text-primary">{stat.value}</span>
                  </div>
                ))}
              </div>
            )}
            {slide.additional && (
              <p className="text-xs text-muted-foreground leading-relaxed pt-3 border-t">
                {slide.additional}
              </p>
            )}
            {slide.highlight && (
              <div className="bg-primary/5 border-l-2 border-primary px-4 py-3 rounded-r">
                <p className="text-xs text-foreground font-medium">{slide.highlight}</p>
              </div>
            )}
          </div>
        );

      case 'bar-chart':
        const maxValue = Math.max(...(slide.data?.map((d) => d.value) || [0]));
        return (
          <div className="h-full flex flex-col justify-center px-10 py-12 space-y-5">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">{slide.title}</h2>
              <p className="text-xs text-muted-foreground">{slide.subtitle}</p>
            </div>
            <div className="space-y-4">
              {slide.data?.map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-medium text-foreground">{item.region}</span>
                    <span className="text-sm font-mono font-semibold text-primary">{item.value} млн</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
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
        const total = slide.data?.reduce((sum, item) => sum + item.value, 0) || 0;
        let cumulativePercentage = 0;
        
        return (
          <div className="h-full flex flex-col justify-center items-center px-10 py-12 space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground mb-1">{slide.title}</h2>
              <p className="text-xs text-muted-foreground">{slide.subtitle}</p>
            </div>
            
            <div className="flex items-center gap-6">
              <svg width="200" height="200" viewBox="0 0 240 240" className="flex-shrink-0">
                {slide.data?.map((item, i) => {
                  const percentage = (item.value / total) * 100;
                  const startAngle = (cumulativePercentage / 100) * 360 - 90;
                  const endAngle = ((cumulativePercentage + percentage) / 100) * 360 - 90;
                  cumulativePercentage += percentage;
                  
                  const startX = 120 + 100 * Math.cos((startAngle * Math.PI) / 180);
                  const startY = 120 + 100 * Math.sin((startAngle * Math.PI) / 180);
                  const endX = 120 + 100 * Math.cos((endAngle * Math.PI) / 180);
                  const endY = 120 + 100 * Math.sin((endAngle * Math.PI) / 180);
                  
                  const largeArcFlag = percentage > 50 ? 1 : 0;
                  
                  const pathData = [
                    `M 120 120`,
                    `L ${startX} ${startY}`,
                    `A 100 100 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                    `Z`
                  ].join(' ');
                  
                  return (
                    <path
                      key={i}
                      d={pathData}
                      fill={item.color}
                      stroke="white"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
              
              <div className="grid grid-cols-1 gap-2 flex-1">
                {slide.data?.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex-1 flex justify-between items-baseline gap-3">
                      <span className="text-xs text-foreground">{item.label}</span>
                      <span className="text-sm font-mono font-semibold text-primary flex-shrink-0">
                        {item.value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {slide.source && (
              <p className="text-xs text-muted-foreground text-center">{slide.source}</p>
            )}
          </div>
        );

      case 'bar-chart-horizontal':
        const maxPrice = Math.max(...(slide.data?.map((d) => d.value) || [0]));
        return (
          <div className="h-full flex flex-col justify-center px-10 py-12 space-y-4">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">{slide.title}</h2>
              <p className="text-xs text-muted-foreground mb-3">{slide.subtitle}</p>
            </div>
            <div className="flex items-end justify-between gap-2 h-44">
              {slide.data?.map((item, i) => {
                const heightPercent = (item.value / maxPrice) * 100;
                return (
                  <div key={i} className="flex flex-col items-center flex-1 gap-2">
                    <div className="w-full flex flex-col justify-end h-full">
                      <div className="text-center mb-1">
                        <span className="text-xs font-mono font-semibold text-primary block">
                          {(item.value / 1000).toFixed(1)}k
                        </span>
                      </div>
                      <div
                        className="bg-primary rounded-t w-full transition-all duration-500"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-medium text-foreground text-center leading-tight">
                      {item.city}
                    </span>
                  </div>
                );
              })}
            </div>
            {slide.note && (
              <p className="text-xs text-foreground bg-primary/5 px-3 py-2 rounded border-l-2 border-primary leading-relaxed">
                {slide.note}
              </p>
            )}
          </div>
        );

      case 'conclusion':
        return (
          <div className="h-full flex flex-col justify-center px-10 py-12 space-y-5">
            <h2 className="text-xl font-bold text-foreground">{slide.title}</h2>
            <div className="space-y-4">
              {slide.points?.map((point, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-mono font-semibold text-primary">{i + 1}</span>
                  </div>
                  <p className="text-xs text-foreground leading-relaxed pt-0.5">{point}</p>
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




        </Card>

<div className="mt-6 flex flex-wrap gap-3 justify-center">
          {carouselData.map((_, index) => (
            <Button
              key={index}
              variant={currentSlide === index ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentSlide(index)}
              className="min-w-[120px]"
            >
              Карточка {index + 1}
            </Button>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            onClick={() => downloadCard(currentSlide)}
            className="gap-2"
          >
            <Icon name="Download" size={16} />
            Скачать карточку {currentSlide + 1}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;