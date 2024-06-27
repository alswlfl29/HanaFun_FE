import { FC, useEffect, useRef, useState } from 'react';
import { LuMinusCircle, LuPlusCircle } from 'react-icons/lu';
import { AddLessonInputLabel } from '../Atom/AddLessonInputLabel';

interface IProps {
  onChangeMaterials: (materials: string) => void;
}

type materialType = {
  id: number;
  material: string;
};

export const AddLessonMaterialList: FC<IProps> = ({ onChangeMaterials }) => {
  const inputMaterialNextID = useRef<number>(1);
  const [inputMaterialItems, setInputMaterialItems] = useState<materialType[]>([
    { id: 0, material: '' },
  ]);
  // input 추가
  const addInput = () => {
    if (inputMaterialItems.length >= 5) return;
    const input: materialType = {
      id: inputMaterialNextID.current,
      material: '',
    };
    setInputMaterialItems([...inputMaterialItems, input]);
    inputMaterialNextID.current += 1;
  };

  // input 삭제
  const deleteInput = (index: number) => {
    setInputMaterialItems(
      inputMaterialItems.filter((item) => item.id !== index)
    );
  };

  const handleMaterialInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (index > inputMaterialItems.length) return;
    const inputItemsCopy = JSON.parse(JSON.stringify(inputMaterialItems));
    inputItemsCopy[index].material = e.target.value;
    setInputMaterialItems(inputItemsCopy);
  };

  const handlechangeMaterials = () => {
    let materials = '';
    inputMaterialItems.map(
      (material) => (materials += material.material + ',')
    );
    onChangeMaterials(materials);
  };

  useEffect(() => {
    handlechangeMaterials();
  }, [inputMaterialItems]);

  return (
    <AddLessonInputLabel title='준비물'>
      {inputMaterialItems.map((item, index) => (
        <div
          key={index}
          className={`w-full flex items-center gap-3 ${inputMaterialItems.length > 1 && index !== inputMaterialItems.length - 1 ? 'mb-2' : undefined}`}
        >
          <input
            type='text'
            placeholder='준비물 입력해주세요.'
            className='w-1/2 rounded border-[0.7px] border-hanaSilver text-xs placeholder:text-hanaSilver p-2 focus:outline-none'
            onChange={(e) => handleMaterialInput(e, index)}
          />
          {index === 0 ? (
            <LuPlusCircle
              size={24}
              className='text-hanaSilver'
              onClick={() => addInput()}
            />
          ) : (
            <LuMinusCircle
              size={24}
              className='text-hanaSilver'
              onClick={() => deleteInput(item.id)}
            />
          )}
        </div>
      ))}
    </AddLessonInputLabel>
  );
};
