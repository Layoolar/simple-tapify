
// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import './App.css';
// import { binanceLogo, dailyCipher, dailyCombo, dailyReward, dollarCoin, mainCharacter } from './images';
// import Earn from './Earn';
// import Friends from './Friends';
// import Mine from './Mine';
// import Airdrop from './Airdrop';
// import DailyReward from './DailyReward';
// import Hamster from './icons/Hamster';
// import Info from './icons/Info';
// import Settings from './icons/Settings';
// import Layout from './Layout';
// import Caution from './Caution';
// import { formatProfitPerHour, isMobileScreen } from './utils/utils';

// const App: React.FC = () => {
//   const levelNames = useMemo(() => [
//     "Bronze", "Silver", "Gold", "Platinum", "Diamond",
//     "Epic", "Legendary", "Master", "GrandMaster", "Lord"
//   ], []);

//   const levelMinPoints = useMemo(() => [
//     0, 5000, 25000, 100000, 1000000,
//     2000000, 10000000, 50000000, 100000000, 1000000000
//   ], []);

//   const [levelIndex, setLevelIndex] = useState(6);
//   const [points, setPoints] = useState(31645210);
//   const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
//   const [profitPerHour, setProfitPerHour] = useState(0);
//   const [currentPage, setCurrentPage] = useState('home');
//   const [activeTasks, setActiveTasks] = useState<{ id: number, profitPerHour: number, timeout: NodeJS.Timeout }[]>([]);

//   const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState("");
//   const [dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState("");
//   const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState("");

//   const calculateTimeLeft = (targetHour: number) => {
//     const now = new Date();
//     const target = new Date(now);
//     target.setUTCHours(targetHour, 0, 0, 0);

//     if (now.getUTCHours() >= targetHour) {
//       target.setUTCDate(target.getUTCDate() + 1);
//     }

//     const diff = target.getTime() - now.getTime();
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

//     const paddedHours = hours.toString().padStart(2, '0');
//     const paddedMinutes = minutes.toString().padStart(2, '0');

//     return `${paddedHours}:${paddedMinutes}`;
//   };

//   useEffect(() => {
//     const updateCountdowns = () => {
//       setDailyRewardTimeLeft(calculateTimeLeft(0));
//       setDailyCipherTimeLeft(calculateTimeLeft(19));
//       setDailyComboTimeLeft(calculateTimeLeft(12));
//     };

//     updateCountdowns();
//     const interval = setInterval(updateCountdowns, 60000); // Update every minute

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const inviteCode = urlParams.get('invite');

//     if (inviteCode) {
//       setPoints(prevPoints => prevPoints + 5000);
//       alert("You've been rewarded 5,000 coins for joining through an invite!");
//     }
//   }, []);

//   useEffect(() => {
//     const pointsPerSecond = profitPerHour / 3600;
//     const interval = setInterval(() => {
//       setPoints(prevPoints => prevPoints + Math.floor(pointsPerSecond));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [profitPerHour]);

//   const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     const card = e.currentTarget;
//     const rect = card.getBoundingClientRect();
//     const x = e.clientX - rect.left - rect.width / 2;
//     const y = e.clientY - rect.top - rect.height / 2;
//     card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
//     setTimeout(() => {
//       card.style.transform = '';
//     }, 100);

//     setPoints(points + pointsToAdd);
//     setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
//   };

//   const handleAnimationEnd = (id: number) => {
//     setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
//   };

//   const calculateProgress = () => {
//     if (levelIndex >= levelNames.length - 1) {
//       return 100;
//     }
//     const currentLevelMin = levelMinPoints[levelIndex];
//     const nextLevelMin = levelMinPoints[levelIndex + 1];
//     const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
//     return Math.min(progress, 100);
//   };

//   useEffect(() => {
//     const currentLevelMin = levelMinPoints[levelIndex];
//     const nextLevelMin = levelMinPoints[levelIndex + 1];
//     if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
//       setLevelIndex(levelIndex + 1);
//     } else if (points < currentLevelMin && levelIndex > 0) {
//       setLevelIndex(levelIndex - 1);
//     }
//   }, [points, levelIndex, levelMinPoints, levelNames.length]);

//   const pointsToAdd = (levelIndex + 1) * 5;

//   const handleInvite = () => {
//     const inviteLink = `${window.location.origin}/?invite=${Date.now()}`;
//     navigator.clipboard.writeText(inviteLink);
//     alert(`Your invite link has been copied: ${inviteLink}`);
//   };

//   const addCoins = (amount: number) => {
//     setPoints(points + amount);
//   };

//   const collectDailyReward = () => {
//     addCoins(5000);
//   };

//   const collectDailyCipher = () => {
//     addCoins(300);
//   };

//   const collectDailyCombo = () => {
//     addCoins(400);
//   };

//   const handleTaskCompletion = (reward: number, pph: number) => {
//     setPoints(points + reward);

//     const newTaskId = Date.now();
//     const newProfitPerHour = profitPerHour + pph;

//     setProfitPerHour(newProfitPerHour);

//     const timeout = setTimeout(() => {
//       setProfitPerHour(prevProfitPerHour => prevProfitPerHour - pph);
//       setActiveTasks((prevTasks) => prevTasks.filter(task => task.id !== newTaskId));
//     }, 5 * 60 * 1000); // 5 minutes

//     setActiveTasks([...activeTasks, { id: newTaskId, profitPerHour: pph, timeout }]);
//   };

//   const handleTelegramTaskCompletion = () => {
//     handleTaskCompletion(50000, 1500);
//   };

//   const renderHomePage = () => (
//     <div className="w-full bg-[#dfe6e9] text-[#2d3436] h-screen font-bold flex flex-col">
//       <div className="px-4 z-10">
//         <div className="flex items-center space-x-2 pt-4">
//           <div className="p-1 rounded-lg bg-[#74b9ff]">
//             <Hamster size={24} className="text-[#2d3436]" />
//           </div>
//           <div>
//             <p className="text-sm">David (CEO)</p>
//           </div>
//         </div>
//         <div className="flex items-center justify-between space-x-4 mt-1">
//           <div className="flex items-center w-1/3">
//             <div className="w-full">
//               <div className="flex justify-between">
//                 <p className="text-sm">{levelNames[levelIndex]}</p>
//                 <p className="text-sm">{levelIndex + 1} <span className="text-[#74b9ff]">/ {levelNames.length}</span></p>
//               </div>
//               <div className="flex items-center mt-1 border-2 border-[#6c5ce7] rounded-full">
//                 <div className="w-full h-2 bg-[#6c5ce7]/[0.6] rounded-full">
//                   <div className="bg-[#6c5ce7] h-2 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center w-2/3 border-2 border-[#6c5ce7] rounded-full px-4 py-[2px] bg-[#6c5ce7]/[0.6] max-w-64">
//             <img src={binanceLogo} alt="Exchange" className="w-8 h-8" />
//             <div className="h-[32px] w-[2px] bg-[#6c5ce7] mx-2"></div>
//             <div className="flex-1 text-center">
//               <p className="text-xs text-[#50e3c2] font-medium">Profit per hour</p>
//               <div className="flex items-center justify-center space-x-1">
//                 <img src={dollarCoin} alt="Dollar Coin" className="w-[18px] h-[18px]" />
//                 <p className="text-sm">{formatProfitPerHour(profitPerHour)}</p>
//                 <Info size={20} className="text-[#6c5ce7]" />
//               </div>
//             </div>
//             <div className="h-[32px] w-[2px] bg-[#6c5ce7] mx-2"></div>
//             <Settings className="text-[#2d3436]" />
//           </div>
//         </div>
//       </div>
//       <div className="flex-grow mt-4 bg-[#74b9ff] rounded-t-[48px] relative z-0">
//         <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#dfe6e9] rounded-t-[46px]">
//           <div className="px-4 mt-6 flex justify-between gap-2">
//             <div className="bg-[#6c5ce7] rounded-lg px-4 py-2 w-full relative">
//               <div className="dot"></div>
//               <img src={dailyReward} alt="Daily Reward" className="mx-auto w-12 h-12" />
//               <p className="text-[10px] text-center text-[#2d3436] mt-1">Daily reward</p>
//               <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyRewardTimeLeft}</p>
//               {dailyRewardTimeLeft === "00:00" && (
//                 <button onClick={collectDailyReward} className="text-white mt-2 bg-blue-500 rounded px-2 py-1">Collect</button>
//               )}
//             </div>
//             <div className="bg-[#6c5ce7] rounded-lg px-4 py-2 w-full relative">
//               <div className="dot"></div>
//               <img src={dailyCipher} alt="Daily Cipher" className="mx-auto w-12 h-12" />
//               <p className="text-[10px] text-center text-[#2d3436] mt-1">Daily cipher</p>
//               <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyCipherTimeLeft}</p>
//               {dailyCipherTimeLeft === "00:00" && (
//                 <button onClick={collectDailyCipher} className="text-white mt-2 bg-blue-500 rounded px-2 py-1">Collect</button>
//               )}
//             </div>
//             <div className="bg-[#6c5ce7] rounded-lg px-4 py-2 w-full relative">
//               <div className="dot"></div>
//               <img src={dailyCombo} alt="Daily Combo" className="mx-auto w-12 h-12" />
//               <p className="text-[10px] text-center text-[#2d3436] mt-1">Daily combo</p>
//               <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyComboTimeLeft}</p>
//               {dailyComboTimeLeft === "00:00" && (
//                 <button onClick={collectDailyCombo} className="text-white mt-2 bg-blue-500 rounded px-2 py-1">Collect</button>
//               )}
//             </div>
//           </div>
//           <div className="px-4 mt-4 flex justify-center">
//             <div className="px-4 py-2 flex items-center space-x-2">
//               <img src={dollarCoin} alt="Dollar Coin" className="w-10 h-10" />
//               <p className="text-4xl text-[#2d3436]">{points.toLocaleString()}</p>
//             </div>
//           </div>
//           <div className="px-4 mt-4 flex justify-center">
//             <div className="w-80 h-80 p-4 rounded-full circle-outer" onClick={handleCardClick}>
//               <div className="w-full h-full rounded-full circle-inner">
//                 <img src={mainCharacter} alt="Main Character" className="w-full h-full" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {clicks.map((click) => (
//         <div
//           key={click.id}
//           className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
//           style={{
//             top: `${click.y - 42}px`,
//             left: `${click.x - 28}px`,
//             animation: `float 1s ease-out`
//           }}
//           onAnimationEnd={() => handleAnimationEnd(click.id)}
//         >
//           {pointsToAdd}
//         </div>
//       ))}
//     </div>
//   );

//   if (!isMobileScreen()) {
//     return <Caution isVisible={!isMobileScreen()} />;
//   }

//   return (
//     <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
//       {currentPage === 'home' && renderHomePage()}
//       {currentPage === 'earn' && (
//         <Earn
//           onCompleteTask={handleTaskCompletion}
//           onCompleteTelegramTask={handleTelegramTaskCompletion}
//           setCurrentPage={setCurrentPage}
//           setProfitPerHour={setProfitPerHour}
//           profitPerHour={profitPerHour}
//           currentPage={currentPage}
//         />
//       )}
//       {currentPage === 'friends' && (
//         <Friends
//           onInvite={handleInvite}
//           onInvitePremium={handleInvite}
//           setCurrentPage={setCurrentPage}
//           profitPerHour={profitPerHour}
//           currentPage={currentPage}
//         />
//       )}
//       {currentPage === 'mine' && (
//         <Mine
//           setCurrentPage={setCurrentPage}
//           profitPerHour={profitPerHour}
//           currentPage={currentPage}
//         />
//       )}
//       {currentPage === 'airdrop' && (
//         <Airdrop
//           setCurrentPage={setCurrentPage}
//           profitPerHour={profitPerHour}
//           currentPage={currentPage}
//         />
//       )}
//       {currentPage === 'dailyReward' && (
//         <DailyReward
//           setCurrentPage={setCurrentPage}
//           addCoins={addCoins}
//           profitPerHour={profitPerHour}
//           currentPage={currentPage}
//         />
//       )}
//     </Layout>
//   );
// };

// export default App;


import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { binanceLogo, dailyCipher, dailyCombo, dailyReward, dollarCoin, mainCharacter } from './images';
import Earn from './Earn';
import Friends from './Friends';
import Mine from './Mine';
import Airdrop from './Airdrop';
import DailyReward from './DailyReward';
import Hamster from './icons/Hamster';
import Layout from './Layout';
import Caution from './Caution';
import { isMobileScreen } from './utils/utils';

const App: React.FC = () => {
  const levelNames = useMemo(() => [
    "Bronze", "Silver", "Gold", "Platinum", "Diamond",
    "Epic", "Legendary", "Master", "GrandMaster", "Lord"
  ], []);

  const levelMinPoints = useMemo(() => [
    0, 5000, 25000, 100000, 1000000,
    2000000, 10000000, 50000000, 100000000, 1000000000
  ], []);

  const [levelIndex, setLevelIndex] = useState(6);
  const [points, setPoints] = useState(31645210);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [autoComplete, setAutoComplete] = useState(false); // State for Autocomplete Tasks toggle

  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState("");
  const [dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState("");
  const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState("");

  const calculateTimeLeft = (targetHour: number) => {
    const now = new Date();
    const target = new Date(now);
    target.setUTCHours(targetHour, 0, 0, 0);

    if (now.getUTCHours() >= targetHour) {
      target.setUTCDate(target.getUTCDate() + 1);
    }

    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}`;
  };

  useEffect(() => {
    const updateCountdowns = () => {
      setDailyRewardTimeLeft(calculateTimeLeft(0));
      setDailyCipherTimeLeft(calculateTimeLeft(19));
      setDailyComboTimeLeft(calculateTimeLeft(12));
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get('invite');

    if (inviteCode) {
      setPoints(prevPoints => prevPoints + 5000);
      alert("You've been rewarded 5,000 coins for joining through an invite!");
    }
  }, []);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = '';
    }, 100);

    setPoints(points + pointsToAdd);
    setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  const calculateProgress = () => {
    if (levelIndex >= levelNames.length - 1) {
      return 100;
    }
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(progress, 100);
  };

  useEffect(() => {
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
      setLevelIndex(levelIndex + 1);
    } else if (points < currentLevelMin && levelIndex > 0) {
      setLevelIndex(levelIndex - 1);
    }
  }, [points, levelIndex, levelMinPoints, levelNames.length]);

  const pointsToAdd = (levelIndex + 1) * 5;

  const handleInvite = () => {
    const inviteLink = `${window.location.origin}/?invite=${Date.now()}`;
    navigator.clipboard.writeText(inviteLink);
    alert(`Your invite link has been copied: ${inviteLink}`);
  };

  const addCoins = (amount: number) => {
    setPoints(points + amount);
  };

  const collectDailyReward = () => {
    addCoins(5000);
  };

  const collectDailyCipher = () => {
    addCoins(300);
  };

  const collectDailyCombo = () => {
    addCoins(400);
  };

  // Toggle button handler for Autocomplete Tasks
  const toggleAutoComplete = () => {
    setAutoComplete(!autoComplete);
  };

  const renderHomePage = () => (
    <div className="w-full bg-[#dfe6e9] text-[#2d3436] h-screen font-bold flex flex-col">
      <div className="px-4 z-10">
        <div className="flex items-center space-x-2 pt-4">
          <div className="p-1 rounded-lg bg-[#74b9ff]">
            <Hamster size={24} className="text-[#2d3436]" />
          </div>
          <div>
            <p className="text-sm">David (CEO)</p>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-4 mt-1">
          <div className="flex items-center w-1/3">
            <div className="w-full">
              <div className="flex justify-between">
                <p className="text-sm">{levelNames[levelIndex]}</p>
                <p className="text-sm">{levelIndex + 1} <span className="text-[#74b9ff]">/ {levelNames.length}</span></p>
              </div>
              <div className="flex items-center mt-1 border-2 border-[#6c5ce7] rounded-full">
                <div className="w-full h-2 bg-[#6c5ce7]/[0.6] rounded-full">
                  <div className="bg-[#6c5ce7] h-2 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle Button with "Autocomplete Tasks" */}
          <div className="flex items-center">
            <label htmlFor="autocomplete-toggle" className="text-sm font-bold mr-2">
              Autocomplete Tasks
            </label>
            <input
              type="checkbox"
              id="autocomplete-toggle"
              className="toggle-checkbox"
              checked={autoComplete}
              onChange={toggleAutoComplete}
            />
          </div>
        </div>
      </div>

      <div className="flex-grow mt-4 bg-[#74b9ff] rounded-t-[48px] relative z-0">
        <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#dfe6e9] rounded-t-[46px]">
          <div className="px-4 mt-6 flex justify-between gap-2">
            <div className="bg-[#6c5ce7] rounded-lg px-4 py-2 w-full relative">
              <div className="dot"></div>
              <img src={dailyReward} alt="Daily Reward" className="mx-auto w-12 h-12" />
              <p className="text-[10px] text-center text-[#2d3436] mt-1">Daily reward</p>
              <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyRewardTimeLeft}</p>
              {dailyRewardTimeLeft === "00:00" && (
                <button onClick={collectDailyReward} className="text-white mt-2 bg-blue-500 rounded px-2 py-1">Collect</button>
              )}
            </div>
            <div className="bg-[#6c5ce7] rounded-lg px-4 py-2 w-full relative">
              <div className="dot"></div>
              <img src={dailyCipher} alt="Daily Cipher" className="mx-auto w-12 h-12" />
              <p className="text-[10px] text-center text-[#2d3436] mt-1">Daily cipher</p>
              <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyCipherTimeLeft}</p>
              {dailyCipherTimeLeft === "00:00" && (
                <button onClick={collectDailyCipher} className="text-white mt-2 bg-blue-500 rounded px-2 py-1">Collect</button>
              )}
            </div>
            <div className="bg-[#6c5ce7] rounded-lg px-4 py-2 w-full relative">
              <div className="dot"></div>
              <img src={dailyCombo} alt="Daily Combo" className="mx-auto w-12 h-12" />
              <p className="text-[10px] text-center text-[#2d3436] mt-1">Daily combo</p>
              <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyComboTimeLeft}</p>
              {dailyComboTimeLeft === "00:00" && (
                <button onClick={collectDailyCombo} className="text-white mt-2 bg-blue-500 rounded px-2 py-1">Collect</button>
              )}
            </div>
          </div>
          <div className="px-4 mt-4 flex justify-center">
            <div className="px-4 py-2 flex items-center space-x-2">
              <img src={dollarCoin} alt="Dollar Coin" className="w-10 h-10" />
              <p className="text-4xl text-[#2d3436]">{points.toLocaleString()}</p>
            </div>
          </div>
          <div className="px-4 mt-4 flex justify-center">
            <div className="w-80 h-80 p-4 rounded-full circle-outer" onClick={handleCardClick}>
              <div className="w-full h-full rounded-full circle-inner">
                <img src={mainCharacter} alt="Main Character" className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {clicks.map((click) => (
        <div
          key={click.id}
          className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: `float 1s ease-out`
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          {pointsToAdd}
        </div>
      ))}
    </div>
  );

  if (!isMobileScreen()) {
    return <Caution isVisible={!isMobileScreen()} />;
  }

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {currentPage === 'home' && renderHomePage()}
      {currentPage === 'earn' && (
        <Earn
          onCompleteTask={() => {}}
          setCurrentPage={setCurrentPage}
          autoComplete={autoComplete} // Pass the toggle state to child components
        />
      )}
      {currentPage === 'friends' && (
        <Friends
          setCurrentPage={setCurrentPage}
          autoComplete={autoComplete} // Pass the toggle state
        />
      )}
      {currentPage === 'mine' && (
        <Mine
          setCurrentPage={setCurrentPage}
          autoComplete={autoComplete} // Pass the toggle state
          
        />
      )}
      {currentPage === 'airdrop' && (
        <Airdrop
          setCurrentPage={setCurrentPage}
          autoComplete={autoComplete} // Pass the toggle state
        />
      )}
      {currentPage === 'dailyReward' && (
        <DailyReward
          setCurrentPage={setCurrentPage}
          addCoins={addCoins}
        />
      )}
    </Layout>
  );
};

export default App;
