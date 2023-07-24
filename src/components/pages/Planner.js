import React, { useState } from 'react';

const MiniModal = ({ isOpen, onClose, exercise }) => {
  return (
    <div className={`mini-modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h3>{exercise.name}</h3>
        <p>{exercise.details}</p>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const ExerciseItem = ({ exercise, selected, onAddToSelected }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleMouseEnter = () => {
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  const handleDetailsClick = () => {
    setShowDetailsModal(true);
  };

  const handleModalClose = () => {
    setShowDetailsModal(false);
  };

  return (
    <div
      className={`exercise-item ${selected ? 'selected' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span>{exercise.name}</span>
      {showButtons && (
        <div className="exercise-buttons">
          <button className="add-button" onClick={() => onAddToSelected(exercise)}>
            Add to Selected
          </button>
          <button className="details-button" onClick={handleDetailsClick}>
            Details
          </button>
        </div>
      )}
      {showDetailsModal && (
        <div className="modal-overlay">
          <MiniModal isOpen={showDetailsModal} onClose={handleModalClose} exercise={exercise} />
        </div>
      )}
    </div>
  );
};

const SelectedExerciseCard = ({ exercise, onClick }) => (
  <div className="selected-exercise-card" onClick={onClick}>
    <span>{exercise.name}</span>
  </div>
);

const GoalTracker = ({ progress, selectedExercises }) => {
  const [nextExerciseIndex, setNextExerciseIndex] = useState(0);
  const [showNextExerciseLink, setShowNextExerciseLink] = useState(false);

  const handleNextStep = () => {
    const nextIndex = progress;
    if (selectedExercises[nextIndex]) {
      setNextExerciseIndex(nextIndex);
      setShowNextExerciseLink(true);
    } else {
      setNextExerciseIndex(0);
      setShowNextExerciseLink(false);
    }
  };

  const nextExercise = selectedExercises[nextExerciseIndex];
  const progressBarWidth = `${(progress / 5) * 100}%`;

  return (
    <div className="goal-tracker">
      <h3>Goal Tracker</h3>
      <div className="progress-bar">
        <div className="progress-line">
          <div className="progress-fill" style={{ width: progressBarWidth }}></div>
        </div>
        <div className="progress-steps">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className={`progress-step ${index < progress ? 'completed' : ''}`} key={index} />
          ))}
        </div>
      </div>
      {showNextExerciseLink && nextExercise && (
        <div className="next-exercise">
          <h4>Next Exercise:</h4>
          <p>{nextExercise.name}</p>
          <a href={nextExercise.youtubeLink} target="_blank" rel="noopener noreferrer">
            Watch Video
          </a>
        </div>
      )}
      <button className="fill-button" onClick={handleNextStep} disabled={progress >= selectedExercises.length}>
        Next Step
      </button>
    </div>
  );
};

const Planner = () => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [filters, setFilters] = useState([]);
  const [progress, setProgress] = useState(0);
  const [exerciseOptions, setExerciseOptions] = useState([
    {
      name: 'Close grip pull-up',
      muscleGroup: 'Biceps',
      details:
        'Step-by-step guide for Close grip pull-up:\n' +
        '1. Grab the pull-up bar with your hands close together, slightly narrower than shoulder-width apart, and palms facing towards you.\n' +
        '2. Hang from the bar with your arms fully extended.\n' +
        '3. Engage your back and biceps muscles to pull your body up towards the bar.\n' +
        '4. Continue pulling until your chin is above the bar.\n' +
        '5. Lower yourself down with control to the starting position.\n',
      youtubeLink: 'https://www.youtube.com/watch?v=j--ftfgTL5I',
    },
    {
      name: 'Squats',
      muscleGroup: 'Legs',
      details:
        'Step-by-step guide for Squats:\n' +
        '1. Stand with your feet shoulder-width apart and toes slightly turned out.\n' +
        '2. Keep your back straight and chest up.\n' +
        '3. Bend your knees and hips to lower your body towards the ground, as if sitting back in a chair.\n' +
        '4. Lower down until your thighs are parallel to the ground or slightly below.\n' +
        '5. Push through your heels to return to the starting position.\n',
      youtubeLink: 'https://www.youtube.com/watch?v=xqvCmoLULNY',
    },
    {
      name: 'Deadlifts',
      muscleGroup: 'Back',
      details:
        'Step-by-step guide for Deadlifts:\n' +
        '1. Stand with your feet shoulder-width apart and a barbell in front of you.\n' +
        '2. Bend at your hips and knees to grip the barbell with hands shoulder-width apart, palms facing you.\n' +
        '3. Keep your back straight and chest up as you lift the barbell by extending your hips and knees.\n' +
        '4. Stand up straight with the barbell close to your body.\n' +
        '5. Lower the barbell back to the ground by bending at your hips and knees.\n',
      youtubeLink: 'https://www.youtube.com/watch?v=GxsLrTzyGUU',
    },
    {
      name: 'Wrist Curls',
      muscleGroup: 'Forearms',
      details:
        'Step-by-step guide for Wrist Curls:\n' +
        '1. Sit on a bench or stand with your forearm resting on your knee or a flat surface.\n' +
        '2. Hold a dumbbell with your palm facing up.\n' +
        '3. Curl the dumbbell upward with your wrist, flexing your forearm.\n' +
        '4. Slowly lower the dumbbell back to the starting position.\n' +
        'Note: You can also perform wrist curls with a barbell or a wrist curl machine.',
      youtubeLink: 'https://www.youtube.com/watch?v=u61QWKYgbxI',
    },
    {
      name: 'Bench press',
      muscleGroup: 'Chest',
      details:
        'Step-by-step guide for Bench Press:\n' +
        '1. Lie on a flat bench with your feet flat on the ground.\n' +
        '2. Grasp the barbell with a grip slightly wider than shoulder-width apart.\n' +
        '3. Lower the barbell to your chest by bending your elbows.\n' +
        '4. Push the barbell back up to the starting position, fully extending your arms.\n' +
        'Note: You can also perform bench press with dumbbells or on an incline/decline bench.',
      youtubeLink: 'https://www.youtube.com/watch?v=lWFknlOTbyM',
    },
    {
      name: 'Dumbbell curl',
      muscleGroup: 'Biceps',
      details:
        'Step-by-step guide for Dumbbell Curl:\n' +
        '1. Stand with a dumbbell in each hand, palms facing forward, and arms fully extended.\n' +
        '2. Curl the dumbbells upward, contracting your biceps.\n' +
        '3. Lower the dumbbells back down to the starting position.\n' +
        'Note: You can perform alternate curls (one arm at a time) or both arms simultaneously.',
      youtubeLink: 'https://www.youtube.com/watch?v=soxrZlIl35U',
    },
    {
      name: 'Dips',
      muscleGroup: 'Triceps',
      details:
        'Step-by-step guide for Dips:\n' +
        '1. Grab parallel bars with your hands shoulder-width apart and palms facing down.\n' +
        '2. Lift your body off the ground, supporting your weight with your arms.\n' +
        '3. Lower your body by bending your elbows until your upper arms are parallel to the ground.\n' +
        '4. Push your body back up to the starting position.\n' +
        'Note: Dips primarily target your triceps, but they also engage your chest and shoulders.',
      youtubeLink: 'https://www.youtube.com/watch?v=VsE1PIF_59w',
    },
    {
      name: 'Pull-ups',
      muscleGroup: 'Abs',
      details:
        'Step-by-step guide for Pull-ups:\n' +
        '1. Hang from a pull-up bar with your hands slightly wider than shoulder-width apart and palms facing away from you.\n' +
        '2. Pull your body up towards the bar by engaging your back and biceps.\n' +
        '3. Continue pulling until your chin is above the bar.\n' +
        '4. Lower yourself down with control to the starting position.\n' +
        'Note: Pull-ups primarily target your back and biceps, but they also engage your shoulders and core.',
      youtubeLink: 'https://www.youtube.com/watch?v=XB_7En-zf_M',
    },
  ]);
  

  const handleFilterToggle = (filter) => {
    if (filters.includes(filter)) {
      setFilters(filters.filter((item) => item !== filter));
    } else {
      setFilters([...filters, filter]);
    }
  };

  const filteredExerciseOptions = exerciseOptions.filter((option) =>
    filters.length === 0 ? true : filters.includes(option.muscleGroup)
  );

  const handleApply = () => {
    console.log('Selected Exercises:', selectedExercises);
  };

  const handleMoveToSelected = (exercise) => {
    setSelectedExercises([...selectedExercises, exercise]);
    setExerciseOptions(exerciseOptions.filter((item) => item.name !== exercise.name));
  };

  const handleMoveToOptions = (exercise) => {
    setSelectedExercises(selectedExercises.filter((item) => item.name !== exercise.name));
    setExerciseOptions([...exerciseOptions, exercise]);
  };

  const handleFillButton = () => {
    if (progress < 5) {
      setProgress(progress + 1);
    }
  };

  return (
    <section className="workout-planner">
      <h2>Workout Planner</h2>
      <div className="filter-section">
        <h3>Filter By Muscle Group:</h3>
        <div className="filter-options">
        <button
            className={`filter-button ${filters.includes('Chest') ? 'active' : ''}`}
            onClick={() => handleFilterToggle('Chest')}
          >
            Chest
          </button>
          <button
            className={`filter-button ${filters.includes('Legs') ? 'active' : ''}`}
            onClick={() => handleFilterToggle('Legs')}
          >
            Legs
          </button>
          <button
            className={`filter-button ${filters.includes('Forearms') ? 'active' : ''}`}
            onClick={() => handleFilterToggle('Forearms')}
          >
            Forearms
          </button>
          <button
            className={`filter-button ${filters.includes('Back') ? 'active' : ''}`}
            onClick={() => handleFilterToggle('Back')}
          >
            Back
          </button>
          <button
            className={`filter-button ${filters.includes('Biceps') ? 'active' : ''}`}
            onClick={() => handleFilterToggle('Biceps')}
          >
            Biceps
          </button>
          <button
            className={`filter-button ${filters.includes('Triceps') ? 'active' : ''}`}
            onClick={() => handleFilterToggle('Triceps')}
          >
            Triceps
          </button>
          <button
            className={`filter-button ${filters.includes('Abs') ? 'active' : ''}`}
            onClick={() => handleFilterToggle('Abs')}
          >
            Abs
          </button>
        </div>
      </div>
      <div className="exercise-list">
        {filteredExerciseOptions.map((exercise) => (
          <ExerciseItem
            exercise={exercise}
            selected={selectedExercises.includes(exercise)}
            onAddToSelected={handleMoveToSelected}
            key={exercise.name}
          />
        ))}
      </div>
      <button onClick={handleApply}>Apply</button>
      {selectedExercises.length > 0 && (
        <div className="selected-exercises">
          <h3>Selected Exercises:</h3>
          <div className="selected-exercise-cards">
            {selectedExercises.map((exercise) => (
              <SelectedExerciseCard exercise={exercise} onClick={() => handleMoveToOptions(exercise)} key={exercise.name} />
            ))}
          </div>
        </div>
      )}
      <GoalTracker progress={progress} selectedExercises={selectedExercises} />
      <button className="fill-button" onClick={handleFillButton} disabled={progress >= selectedExercises.length}>
        Complete
      </button>
    </section>
  );
};

export default Planner;
