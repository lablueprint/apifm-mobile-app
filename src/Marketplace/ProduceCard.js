import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

const ProduceCard = function ProduceCard({ title, subtitle }) {
  return (
    <View className="Card">
      {title}
      {subtitle}
    </View>
  );
};

ProduceCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default ProduceCard;
