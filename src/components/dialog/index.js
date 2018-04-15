import React from 'react';
import {StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import {Colors} from '../../style';
import Modal from '../../screensComponents/modal';
import View from '../view';

class Dialog extends BaseComponent {
  static propTypes = {
    /**
     * Control visibility of the dialog
     */
    visible: PropTypes.bool,
    /**
     * allow dismissing a dialog when clicking on the background
     */
    onBackgroundPress: PropTypes.func,
    /**
     * The color of the overlay background
     */
    overlayBackgroundColor: PropTypes.string,
    /**
     * The dialog background color (default: white)
     */
    dialogBackgroundColor: PropTypes.string,
    /**
     * The dialog width (default: 90%)
     */
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * The dialog height (default: 70%)
     */
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * the animation configuration to pass to the dialog (based on react-native-animatable,
     * ex. {animation, duration, easing,..})
     */
    animationConfig: PropTypes.object,
    /**
     * The dialog container style
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  };

  static defaultProps = {
    overlayBackgroundColor: Colors.rgba(Colors.dark10, 0.6),
    dialogBackgroundColor: Colors.white,
    width: '90%',
    height: '70%',
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getAnimationConfig() {
    const {animationConfig} = this.props;
    return {
      animation: 'slideInUp',
      duration: 400,
      useNativeDriver: true,
      ...animationConfig,
    };
  }

  render() {
    const {visible, overlayBackgroundColor, onBackgroundPress} = this.props;
    const {alignments} = this.state;
    const centerByDefault = _.isEmpty(alignments);

    return (
      <Modal
        transparent
        visible={visible}
        animationType={'fade'}
        onBackgroundPress={onBackgroundPress}
        overlayBackgroundColor={overlayBackgroundColor}
      >
        <View center={centerByDefault} style={[this.styles.overlay, alignments]} pointerEvents="box-none">
          <Animatable.View style={this.styles.dialogContainer} {...this.getAnimationConfig()}>
            {this.props.children}
          </Animatable.View>
        </View>
      </Modal>
    );
  }
}

function createStyles({dialogBackgroundColor, width, height}) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
    },
    dialogContainer: {
      width,
      height,
    },
    dialog: {
      flex: 1,
      backgroundColor: dialogBackgroundColor,
    },
  });
}

export default Dialog;