import React from 'react'
import Alert, { AlertProps } from 'react-bootstrap/Alert'

type Props = {
  dismissible: boolean
  alert: AlertProps
  onClose: () => void
}

interface ComponentState {
  show: boolean
}

class AutoDismissAlert extends React.Component<Props, ComponentState> {
  timer!: NodeJS.Timeout
  constructor(props: Props) {
    super(props)

    this.state = {
      show: true
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ show: false })
    }, 4000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  handleClose = () => this.setState({ show: false })

  render() {
    const { alert } = this.props
    return (
      <Alert
        dismissible
        show={this.state.show}
        variant={alert.variant}
        onClose={this.handleClose}
      >
        <div className="container">
          <Alert.Heading>{alert.title}</Alert.Heading>
        </div>
      </Alert>
    )
  }
}

export default AutoDismissAlert
