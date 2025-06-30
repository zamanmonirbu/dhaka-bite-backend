import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a meal name'],
    trim: true
  },
  time: {
    type: String,
    required: [true, 'Please specify meal type'],
  },
  foodPackage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MealPackage',
    required: [true, 'Please select a food package']
  },
  packageName: {
    type: String,
    required: [true, 'Please add a package name']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: String,
        required: true
      },
      unit: {
        type: String,
        required: true
      }
    }
  ],
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  availability: {
      type: String,
      enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      required: true
    },
  deliveryCharges: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Meal = mongoose.model('Meal', mealSchema);
export default Meal;