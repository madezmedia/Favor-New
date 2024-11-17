import streamlit as st
import pandas as pd
import plotly.express as px

def render_current_analysis(analysis_history):
    if analysis_history:
        latest = analysis_history[-1]
        st.header(f"Analysis: {latest['teams']}")
        
        col1, col2 = st.columns(2)
        with col1:
            st.subheader("Match Details")
            st.write(f"Sport: {latest['sport']}")
            st.write(f"Bet Type: {latest['bet_type']}")
            st.write(f"Analysis Time: {latest['timestamp']}")
        
        with col2:
            st.subheader("Recommendation")
            st.write(latest['result'])

def render_historical_data(analysis_history):
    if analysis_history:
        history_df = pd.DataFrame(analysis_history)
        st.dataframe(history_df)

def render_trends(analysis_history):
    if analysis_history:
        analysis_by_sport = pd.DataFrame([
            {'sport': x['sport']} for x in analysis_history
        ]).value_counts().reset_index()
        
        fig = px.pie(analysis_by_sport, values=0, names='sport', 
                    title='Analysis Distribution by Sport')
        st.plotly_chart(fig)