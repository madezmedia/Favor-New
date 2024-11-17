import streamlit as st
from typing import Tuple

def render_sidebar() -> Tuple[str, str, str, str]:
    with st.sidebar:
        st.header("Analysis Parameters")
        sport = st.selectbox(
            "Select Sport",
            ["NFL", "NBA", "MLB", "NHL", "Soccer"]
        )
        
        bet_type = st.selectbox(
            "Bet Type",
            ["Spread", "Moneyline", "Over/Under", "Parlay"]
        )
        
        team1 = st.text_input("Team 1")
        team2 = st.text_input("Team 2")
        
        return sport, bet_type, team1, team2