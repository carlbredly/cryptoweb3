import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa6";
import { RiSettings3Fill } from "react-icons/ri";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Label,
  Dot,
} from "recharts";
import Nav from "./Nav";

interface PricePoint {
  time: number;
  price: number;
}

const mockPrices: PricePoint[] = [
  { time: 0, price: 15030.00 },   // 16:15
  { time: 1, price: 15035.50 },   // 16:30
  { time: 2, price: 15042.20 },   // 16:45
  { time: 3, price: 15048.80 },   // 17:00
  { time: 4, price: 15052.40 },
  { time: 5, price: 15058.60 },
  { time: 6, price: 15063.30 },
  { time: 7, price: 15067.90 },
  { time: 8, price: 15070.00 },
  { time: 9, price: 15069.12 },
  { time: 10, price: 15065.50 },  // 17:15
];

// Fonction pour générer des données selon l'intervalle
const generateDataForInterval = (interval: string): PricePoint[] => {
  const basePrice = 15030.00;
  
  switch (interval) {
    case '15m':
      // 15 minutes : 12 points (chaque point = 15 min)
      return Array.from({ length: 12 }, (_, i) => {
        const trend = i * 2; // Légère tendance haussière
        const variation = Math.sin(i / 2) * 25;
        const noise = (Math.random() - 0.5) * 8;
        return {
          time: i,
          price: Math.max(15000, Math.min(15100, basePrice + trend + variation + noise))
        };
      });
    case '1M':
      // 1 mois : 30 points (chaque point = 1 jour)
      return Array.from({ length: 30 }, (_, i) => {
        const trend = i * 1.5;
        const variation = Math.sin(i / 5) * 45;
        const noise = (Math.random() - 0.5) * 12;
        return {
          time: i,
          price: Math.max(15000, Math.min(15100, basePrice + trend + variation + noise))
        };
      });
    case '1H':
      // 1 heure : 24 points (chaque point = 2.5 min)
      return Array.from({ length: 24 }, (_, i) => {
        const trend = i * 0.8;
        const variation = Math.cos(i / 3) * 22;
        const noise = (Math.random() - 0.5) * 6;
        return {
          time: i,
          price: Math.max(15000, Math.min(15100, basePrice + trend + variation + noise))
        };
      });
    case '1D':
      // 1 jour : 24 points (chaque point = 1 heure)
      return Array.from({ length: 24 }, (_, i) => {
        const trend = i * 1.2;
        const variation = Math.sin(i / 4) * 35;
        const noise = (Math.random() - 0.5) * 10;
        return {
          time: i,
          price: Math.max(15000, Math.min(15100, basePrice + trend + variation + noise))
        };
      });
    default:
      return mockPrices;
  }
};

// Fonction pour formater le temps selon l'intervalle
const formatTime = (time: number, interval: string) => {
  const baseMinutes = 16 * 60 + 15; // 16:15 de départ
  
  switch (interval) {
    case '15m':
      const minutes15 = baseMinutes + (time * 15);
      const hours15 = Math.floor(minutes15 / 60);
      const mins15 = minutes15 % 60;
      return `${hours15.toString().padStart(2, '0')}:${mins15.toString().padStart(2, '0')}`;
    case '1M':
      return `J${time + 1}`;
    case '1H':
      const minutes1H = baseMinutes + (time * 2.5);
      const hours1H = Math.floor(minutes1H / 60);
      const mins1H = Math.floor(minutes1H % 60);
      return `${hours1H.toString().padStart(2, '0')}:${mins1H.toString().padStart(2, '0')}`;
    case '1D':
      const hours1D = (16 + time) % 24;
      return `${hours1D.toString().padStart(2, '0')}:00`;
    default:
      const minutes = baseMinutes + (time * 15);
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }
};

// Composant Tooltip personnalisé (style similaire à l'image)
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="bg-green-600 text-white px-3 py-2 rounded shadow-lg">
        <p className="font-semibold text-base">{value.toFixed(2)}</p>
        <p className="text-xs opacity-90">{value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

const PriceChart = () => {
  const [activeInterval, setActiveInterval] = useState<string>('1M');
  
  // Initialiser avec les données de l'intervalle par défaut
  const initialData = generateDataForInterval('1M');
  
  const [chartData, setChartData] = useState<PricePoint[]>(() => {
    return initialData;
  });
  const [currentPrice, setCurrentPrice] = useState<number>(initialData[initialData.length - 1].price);
  const [previousPrice, setPreviousPrice] = useState<number>(initialData[initialData.length - 2]?.price || initialData[0].price);
  const [animatedPrice, setAnimatedPrice] = useState<number>(initialData[initialData.length - 1].price);
  const [chartHeight, setChartHeight] = useState<number>(340);

  // Gérer la hauteur responsive du graphique
  useEffect(() => {
    const updateHeight = () => {
      const height = Math.min(350, Math.max(250, window.innerHeight * 0.35));
      setChartHeight(height);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Mettre à jour les données lorsque l'intervalle change
  useEffect(() => {
    const newData = generateDataForInterval(activeInterval);
    setChartData(newData);
    const lastPrice = newData[newData.length - 1]?.price || mockPrices[0].price;
    const secondLastPrice = newData[newData.length - 2]?.price || mockPrices[0].price;
    setCurrentPrice(lastPrice);
    setPreviousPrice(secondLastPrice);
    setAnimatedPrice(lastPrice);
  }, [activeInterval]);

  // Animation fluide de la ligne de suivi
  useEffect(() => {
    const startPrice = animatedPrice;
    const endPrice = currentPrice;
    const duration = 500; // 500ms pour une transition fluide
    const steps = 30; // 30 étapes pour une animation fluide
    const stepDuration = duration / steps;
    const priceDiff = endPrice - startPrice;
    
    if (Math.abs(priceDiff) < 0.01) {
      setAnimatedPrice(endPrice);
      return;
    }

    let currentStep = 0;
    const animationInterval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Fonction d'easing pour une transition plus naturelle (ease-in-out)
      const easedProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      const newAnimatedPrice = startPrice + (priceDiff * easedProgress);
      setAnimatedPrice(newAnimatedPrice);

      if (currentStep >= steps) {
        setAnimatedPrice(endPrice);
        clearInterval(animationInterval);
      }
    }, stepDuration);

    return () => clearInterval(animationInterval);
  }, [currentPrice]);

  // Mise à jour dynamique du graphique (plus statique)
  useEffect(() => {
    const interval = setInterval(() => {
      // Générer un nouveau prix basé sur le prix actuel avec une variation plus faible (plus statique)
      setCurrentPrice((prevPrice) => {
        const variation = (Math.random() - 0.5) * 5; // Variation réduite de -2.5 à +2.5
        const newPrice = Math.max(15000, Math.min(15100, prevPrice + variation));
        
        setPreviousPrice(prevPrice);
        
        // Ajouter le nouveau point au graphique
        setChartData((prevData) => {
          const newTime = prevData.length;
          const newData = [...prevData, { time: newTime, price: newPrice }];
          // Garder seulement les 15 derniers points pour un affichage plus statique
          return newData.slice(-15);
        });
        
        return newPrice;
      });
    }, 15000); // Mise à jour toutes les 15 secondes (plus statique)

    return () => clearInterval(interval);
  }, []);

  const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;
  const isPositive = priceChange >= 0;

  const priceString = currentPrice.toFixed(2);
  const [integerPart, decimalPart] = priceString.split(".");
  const formattedInteger = parseInt(integerPart).toLocaleString("en-US");

  return (
    <div className="flex flex-col  w-full max-w-full">
      {/* HEADER */}
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-2">
          <h1>
            {formattedInteger}
            <span className="text-[#FFFFFF80]">.{decimalPart}</span>
          </h1>

          <p className={`text-xl ${isPositive ? "text-[#97FCA6E5]" : "text-[#FF6B6B]"}`}>
            {isPositive ? "+" : ""}
            {priceChange.toFixed(1)}%
          </p>
        </div>

        <div className="flex items-center gap-2">
          <FaHeart
            color="#FFFFFF4D"
            className="w-11 h-11 rounded-md bg-[#222222] p-2 cursor-pointer"
          />
          <RiSettings3Fill
            color="#FFFFFF4D"
            className="w-11 h-11 rounded-md bg-[#222222] p-2 cursor-pointer"
          />
        </div>
      </div>

      {/* CHART */}
      <div className="w-full min-w-full">
        <ResponsiveContainer width="100%" height={chartHeight}>
          <AreaChart
            data={chartData}
            margin={{
              top: 40,
              right: 0,
              left: 30,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff9500" stopOpacity={0.6}/>
                <stop offset="30%" stopColor="#ffaa00" stopOpacity={0.4}/>
                <stop offset="60%" stopColor="#ffd700" stopOpacity={0.2}/>
                <stop offset="100%" stopColor="#00ff00" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#FFFFFF20" 
              vertical={false}
            />
            <XAxis 
              dataKey="time" 
              tickFormatter={(time) => formatTime(time, activeInterval)}
              axisLine={{ stroke: '#FFFFFF40', strokeWidth: 1 }}
              tickLine={{ stroke: '#FFFFFF40', strokeWidth: 1 }}
              tick={{ fill: '#FFFFFF80', fontSize: 12 }}
            />
            <YAxis 
              orientation="right"
              width={80}
              tickFormatter={(value) => value.toFixed(2)}
              axisLine={{ stroke: '#FFFFFF40', strokeWidth: 1 }}
              tickLine={{ stroke: '#FFFFFF40', strokeWidth: 1 }}
              tick={{ fill: '#FFFFFF80', fontSize: 12 }}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#ff9500"
              strokeWidth={2}
              fill="url(#colorPrice)"
              activeDot={{ r: 6, fill: '#ff9500' }}
              dot={(props: any) => {
                // Afficher un point seulement sur le dernier élément
                const { cx, cy, index } = props;
                const lastIndex = chartData.length - 1;
                if (index === lastIndex) {
                  return (
                    <Dot
                      cx={cx}
                      cy={cy}
                      r={6}
                      fill="#ff9500"
                      stroke="#ffffff"
                      strokeWidth={2}
                    />
                  );
                }
                return null;
              }}
            />
            <ReferenceLine 
              y={animatedPrice} 
              stroke="#00ff00" 
              strokeWidth={1.5}
              strokeDasharray="0"
            >
              <Label 
                value={animatedPrice.toFixed(2)} 
                position="right" 
                fill="white"
                style={{ 
                  backgroundColor: '#22c55e',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: 'white',
                  transition: 'all 0.1s ease-out'
                }}
                offset={5}
              />
            </ReferenceLine>
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex justify-between gap-2 mx-4 sm:mx-6 mt-4 mb-4">
          <button
            onClick={() => setActiveInterval('15m')}
            className={`px-6 sm:px-6 md:px-9 py-2 rounded-xl transition-all text-xs sm:text-sm ${
              activeInterval === '15m'
                ? 'bg-gradient-to-r from-[#ecbc7511] to-[#ec673312] text-[#ff9500] border border-[#F4A42C]'
                : 'bg-[#222222] text-white border border-transparent'
            }`}
          >
            15m
          </button>
          <button
            onClick={() => setActiveInterval('1M')}
            className={`px-6 sm:px-8 md:px-9 py-2 rounded-xl transition-all text-xs sm:text-sm ${
              activeInterval === '1M'
                ? 'bg-gradient-to-r from-[#ecbc7511] to-[#ec673312] text-[#ff9500] border border-[#F4A42C]'
                : 'bg-[#222222] text-white border border-transparent'
            }`}
          >
            1M
          </button>
          <button
            onClick={() => setActiveInterval('1H')}
            className={`px-6 sm:px-6 md:px-9 py-2 rounded-xl transition-all text-xs sm:text-sm ${
              activeInterval === '1H'
                ? 'bg-gradient-to-r from-[#ecbc7511] to-[#ec673312] text-[#ff9500] border border-[#F4A42C]'
                : 'bg-[#222222] text-white border border-transparent'
            }`}
          >
            1H
          </button>
          <button
            onClick={() => setActiveInterval('1D')}
            className={`px-6 sm:px-6 md:px-9 py-2 rounded-xl transition-all text-xs sm:text-sm ${
              activeInterval === '1D'
                ? 'bg-gradient-to-r from-[#ecbc7511] to-[#ec673312] text-[#ff9500] border border-[#F4A42C]'
                : 'bg-[#222222] text-white border border-transparent'
            }`}
          >
            1D
          </button>
        </div>

        
        <div className="flex justify-center gap-2 my-4"> 
          <div className="w-2 h-2 rounded-full bg-[#FFFFFF4D]"></div>
          <div className="w-6 h-2 rounded-full bg-[#ECBD75]"></div>
          <div className="w-2 h-2 rounded-full bg-[#FFFFFF4D]"></div>
          <div className="w-2 h-2 rounded-full bg-[#FFFFFF4D]"></div>
          <div className="w-2 h-2 rounded-full bg-[#FFFFFF4D]"></div>
        </div>

        <Nav />
      </div>
    </div>
  );
};

export default PriceChart;
