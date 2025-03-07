function MatchItem({ match }) {
  const translateStatus = (status) => {
    switch (status) {
      case "Ongoing":
        return "LIVE";
      case "Finished":
        return "FINISHED";
      case "Scheduled":
        return "WAITING";
      default:
        return status;
    }
  };

  const statusClass = match.status.toLowerCase();

  return (
    <li className="match-card">
      <section className="team team-left">
        <img
          src={`/avatars/${match.homeTeam.avatar}`}
          alt={`${match.homeTeam.name} avatar`}
          className="team-icon"
        />
        <span className="team-name">{match.homeTeam.name}</span>
      </section>
      <section className="score-status">
        <p className="score">{`${match.homeScore}:${match.awayScore}`}</p>
        <button className={`status-button ${statusClass}`}>
          {translateStatus(match.status)}
        </button>
      </section>
      <section className="team team-right">
        <span className="team-name">{match.awayTeam.name}</span>
        <img
          src={`/avatars/${match.awayTeam.avatar}`}
          alt={`${match.awayTeam.name} avatar`}
          className="team-icon"
        />
      </section>
    </li>
  );
}

export default MatchItem;
