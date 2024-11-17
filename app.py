import streamlit as st
from datetime import datetime
from src.analyst import BettingAnalyst
from src.ui.sidebar import render_sidebar
from src.ui.tabs import (
    render_current_analysis,
    render_historical_data,
    render_trends
)

# Page config
st.set_page_config(
    page_title="Sports Betting Analyst AI",
    page_icon="🎯",
    layout="wide"
)

# Initialize session state
if 'analysis_history' not in st.session_state:
    st.session_state.analysis_history = []

def main():
    st.title("🎯 Sports Betting Analyst AI")
    
    # Render sidebar and get user inputs
    sport, bet_type, team1, team2 = render_sidebar()
    
    # Handle analysis button
    if st.sidebar.button("Analyze"):
        if team1 and team2:
            with st.spinner("Analyzing..."):
                analyst = BettingAnalyst()
                result = analyst.analyze_bet(sport, bet_type, [team1, team2])
                
                # Store analysis in history
                st.session_state.analysis_history.append({
                    'timestamp': datetime.now(),
                    'sport': sport,
                    'teams': f"{team1} vs {team2}",
                    'bet_type': bet_type,
                    'result': result
                })
                
                st.success("Analysis complete!")
        else:
            st.error("Please enter both teams")

    # Render main content tabs
    tab1, tab2, tab3 = st.tabs(["Current Analysis", "Historical Data", "Trends"])
    
    with tab1:
        render_current_analysis(st.session_state.analysis_history)
    
    with tab2:
        render_historical_data(st.session_state.analysis_history)
    
    with tab3:
        render_trends(st.session_state.analysis_history)

if __name__ == "__main__":
    main()