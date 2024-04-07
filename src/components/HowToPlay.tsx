import { useState } from "react";
import Modal from 'react-modal';
import './HowToPlay.css';
import HowToSelectGif from '../assets/how-to-select.gif';

/**
 * Modal that shows the instructions on how to play the game
 */
const HowToPlay: React.FC = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="how-to-play">
      <a href="#" onClick={openModal}>How to Play</a>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Instructions"
      >
        <div className="modal-content">
          <h2>How to Play</h2>
          <p>Find as many japanese words as you can in 3 minutes!</p>
          <p>Forming words:</p>
          <div className="columns">
            <ul>
              <li>Click on a kana to start forming a word</li>
              <li>Hover your cursor on adjacent kana (including diagonal) to add them to the word</li>
              <li>Click on the last kana to finish the word</li>
              <li>If the word is valid, the borders will become green and new kana will be drawn to replace those you used</li>
              <li>If the word is invalid, the borders will become red and you will start over forming a word</li>
            </ul>
            <img
              src={HowToSelectGif}
              alt="How to select"
              className="how-to-select-gif"
            />
          </div>
          <p>Valid words:</p>
          <ul>
            <li>Words must be at least 2 letters long</li>
            <li>Conjugated adjectives or verbs are not allowed</li>
            <li>つ (tsu) can also be used as っ (small tsu), e.g., form かつこよい for かっこよい</li>
            <li>ー (elongated vowel) must be replaced by the vowel, e.g., form かあてん for カーテン</li>
          </ul>
          <p>Scoring: the score for a word is based on the individual score for each kana, which is determined by its rarity in the Japanese language</p>
          <button className="close" onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
}

export default HowToPlay