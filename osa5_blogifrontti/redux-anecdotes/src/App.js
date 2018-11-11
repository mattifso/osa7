import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newAnecdote: ''
    }
  }

  render() {
    const anecdotes = this.props.store.getState()
    const voteAnecdote = (key) => {
      return () => {
        this.props.store.dispatch({ type: 'VOTE', id: key })
      }
    }
    const handleAnecdoteChange = (event) => {
      this.setState({ newAnecdote: event.target.value })
    }
    const createAnecdote = (event) => {
      this.props.store.dispatch({ type: 'CREATE', content: this.state.newAnecdote })
    }
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={voteAnecdote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={createAnecdote}>
          <div><input value={this.state.newAnecdote} onChange={handleAnecdoteChange} /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default App