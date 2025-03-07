import useMatches from "./useMatches";
import LoadingIndicator from "./LoadingIndicator";
import MatchItem from "./MatchItem";
import { useState, useEffect } from "react";
import "./App.css";

function MatchesList() {
  const { data, isLoading, isFetching, isError, error, refetch } = useMatches();
  const [showErrorPanel, setShowErrorPanel] = useState(false);
  const [lastSuccessfulData, setLastSuccessfulData] = useState(null);
  const [isManualLoading, setIsManualLoading] = useState(false);

  useEffect(() => {
    console.log(
      "isLoading:",
      isLoading,
      "isFetching:",
      isFetching,
      "isError:",
      isError,
      "error:",
      error?.message
    );
    if (!isError && data) {
      console.log("Данные успешно загружены:", data);
      setLastSuccessfulData(data);
      setIsManualLoading(false);
    } else if (isError) {
      console.log("Ошибка обнаружена, показываем плашку:", error?.message);
      setShowErrorPanel(true);
      setTimeout(() => setShowErrorPanel(false), 3000);
      setIsManualLoading(false);
    }
  }, [data, isError, error, isFetching]);

  const handleRefresh = async () => {
    console.log("Нажата кнопка Обновить, запускаю refetch");
    setIsManualLoading(true);
    await refetch();
    setIsManualLoading(false);
  };

  return (
    <div id="app">
      <div className="match-tracker">
        <header className="header">
          <h1>Match Tracker</h1>
          <div className="button-container">
            {showErrorPanel && (
              <div className="error-message visible">
                <div
                  className="error-avatar"
                  style={{
                    backgroundColor: "#ff0000",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                  }}
                ></div>
                <img
                  src="/avatars/error-icon.png"
                  alt="Error Icon"
                  className="error-avatar"
                  onError={(e) => {
                    e.target.style.display = "none";
                    console.log("Ошибка загрузки аватарки");
                  }}
                />
                <span className="error-label">Ошибка: </span>
                <span className="error-text">
                  {error?.message || "не удалось загрузить информацию"}
                </span>
              </div>
            )}
            <button className="refresh-button" onClick={handleRefresh}>
              ОБНОВИТЬ
            </button>
          </div>
        </header>
        <ul className="match-list">
          {isManualLoading || isFetching ? (
            <LoadingIndicator />
          ) : lastSuccessfulData ? (
            lastSuccessfulData.map((match) => (
              <MatchItem key={match.time} match={match} />
            ))
          ) : (
            <p>Нет данных</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default MatchesList;
