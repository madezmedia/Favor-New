from crewai import Task, Crew, Process
from typing import List
from .agents import Agents

class BettingAnalyst:
    def __init__(self):
        self.data_analyst = Agents.create_data_analyst()
        self.research_analyst = Agents.create_research_analyst()
        self.betting_specialist = Agents.create_betting_specialist()

    def analyze_bet(self, sport: str, bet_type: str, teams: List[str]) -> dict:
        research_task = Task(
            description=f"Research latest news, injuries, and trends for {teams} in {sport}",
            agent=self.research_analyst
        )

        analysis_task = Task(
            description=f"Analyze historical data and current statistics for {teams}",
            agent=self.data_analyst
        )

        recommendation_task = Task(
            description=f"Provide betting recommendation for {bet_type} bet on {teams}",
            agent=self.betting_specialist
        )

        crew = Crew(
            agents=[self.data_analyst, self.research_analyst, self.betting_specialist],
            tasks=[research_task, analysis_task, recommendation_task],
            process=Process.sequential
        )

        result = crew.kickoff()
        return result