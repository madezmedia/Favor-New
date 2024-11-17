from crewai import Agent

class Agents:
    @staticmethod
    def create_data_analyst():
        return Agent(
            role='Data Analyst',
            goal='Analyze sports data and betting trends with high accuracy',
            backstory='Expert in sports analytics with deep knowledge of statistical analysis',
            verbose=True
        )
    
    @staticmethod
    def create_research_analyst():
        return Agent(
            role='Research Analyst',
            goal='Gather and verify latest sports information and news',
            backstory='Specialized in sports research and information verification',
            verbose=True
        )
    
    @staticmethod
    def create_betting_specialist():
        return Agent(
            role='Sports Betting Specialist',
            goal='Provide detailed betting analysis and recommendations',
            backstory='Expert in sports betting markets with years of experience in odds analysis',
            verbose=True
        )