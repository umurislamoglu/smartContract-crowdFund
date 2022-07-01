import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import campaignConstructor from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import {Router} from '../routes'

class ContributeForm extends Component {
  state = {
    value: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    const campaign = campaignConstructor(this.props.address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="Ooops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>Contribute!</Button>
      </Form>
    );
  }
}

export default ContributeForm;
