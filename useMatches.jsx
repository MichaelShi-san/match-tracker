import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

const useMatches = () => {
  const fetchCountRef = useRef(0); // Используем useRef для сохранения значения

  const generateRandomMatchData = () => {
    const teams = [
      { name: "NaVi", avatar: "NaVi.jpg" },
      { name: "Titan Esports", avatar: "Titan.jpg" },
      { name: "Fnatic", avatar: "Fnatic.jpg" },
      { name: "Astralis", avatar: "Astralis.jpg" },
      { name: "Virtus.pro", avatar: "VirtusPro.jpg" },
      { name: "Team Liquid", avatar: "TeamLiquid.jpg" },
      { name: "FaZe Clan", avatar: "Faze.jpg" },
      { name: "SK Gaming", avatar: "SK.jpg" },
      { name: "MOUZ", avatar: "MOUZ.jpg" },
      { name: "NiP", avatar: "NiP.jpg" },
      { name: "Gambit Esports", avatar: "Gambit.jpg" },
      { name: "Cloud9", avatar: "Cloud9.jpg" },
    ];

    const getRandomTeam = () => {
      return teams[Math.floor(Math.random() * teams.length)];
    };

    const getRandomScore = () => {
      return Math.floor(Math.random() * 17);
    };

    const matches = [];
    const teamIsOngoing = new Set();

    for (let i = 0; i < 5; i++) {
      const homeTeam = getRandomTeam();
      let awayTeam = getRandomTeam();
      while (awayTeam.name === homeTeam.name) {
        awayTeam = getRandomTeam();
      }

      const homeScore = getRandomScore();
      const awayScore = getRandomScore();

      let status;
      if (homeScore >= 16 || awayScore >= 16) {
        status = "Finished";
      } else if (homeScore > 0 || awayScore > 0) {
        if (
          !teamIsOngoing.has(homeTeam.name) &&
          !teamIsOngoing.has(awayTeam.name)
        ) {
          status = "Ongoing";
          teamIsOngoing.add(homeTeam.name);
          teamIsOngoing.add(awayTeam.name);
        } else {
          status = "Scheduled";
        }
      } else {
        status = "Scheduled";
      }

      const finalHomeScore = status === "Scheduled" ? 0 : homeScore;
      const finalAwayScore = status === "Scheduled" ? 0 : awayScore;

      const match = {
        time: `2025-05-03T${String(14 + i).padStart(2, "0")}:00:00Z`,
        title: `Match ${i + 1}`,
        homeTeam: {
          name: homeTeam.name,
          avatar: homeTeam.avatar,
          players: [],
          points: 10 + i * 2,
          place: 1,
          total_kills: 20 + i * 5,
        },
        awayTeam: {
          name: awayTeam.name,
          avatar: awayTeam.avatar,
          players: [],
          points: 8 - i,
          place: 2 + i,
          total_kills: 15 - i * 2,
        },
        homeScore: finalHomeScore,
        awayScore: finalAwayScore,
        status: status,
      };
      matches.push(match);
    }

    return matches;
  };

  const fetchMatches = async () => {
    fetchCountRef.current += 1;
    console.log("fetchCount:", fetchCountRef.current, "Запрос начат");
    try {
      if (fetchCountRef.current % 3 === 0) {
        console.log("Генерируем ошибку на fetchCount:", fetchCountRef.current);
        throw new Error("Ошибка: не удалось загрузить информацию");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Запрос завершён успешно");
      return generateRandomMatchData();
    } catch (error) {
      console.error("Ошибка в fetchMatches:", error.message);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["matches"],
    queryFn: fetchMatches,
    refetchOnWindowFocus: false,
    retry: false,
    cacheTime: 0,
  });
};

export default useMatches;
