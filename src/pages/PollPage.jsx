import {
  Box,
  Divider,
  Flex,
  Heading,
  Progress,
  Radio,
  RadioGroup,
  Icon,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import React from 'react';
import { useState, useEffect, useReducer } from 'react';
import { Buttons } from '../components/Button';
import axios from 'axios';
import { getError } from '../Utils';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_POLL_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_POLL_SUCCESS':
      return { ...state, loading: false, poll: action.payload };
    case 'FETCH_POLL_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

const PollPage = () => {
  const [{ loading, error, poll }, dispatch] = useReducer(reducer, {
    loading: true,
    poll: [],
    error: '',
  });

  const [value, setValue] = useState();
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_POLL_REQUEST' });
      try {
        // const result = await axios.get(
        //   'https://forumbola.babyfie.ro/api/polls'
        // );

        const result = await axios.get('/api/polls');
        dispatch({ type: 'FETCH_POLL_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_POLL_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    localStorage.setItem('pollVoted', voted);

    const pollIndex = Number(value);
    const pollId = poll[0]._id;

    const currentAns = poll[0].answers[pollIndex].answer;

    const oldVotes = poll[0].answers[pollIndex].votes;
    const newVotes = oldVotes + 1;

    // await axios.put(`https://forumbola.babyfie.ro/api/polls/${pollId}`, {
    //   _id: pollId,
    //   votes: newVotes,
    //   answer: currentAns,
    // });

    // await axios.put(`https://api.peakngo.com/api/polls/${pollId}`, {
    //   _id: pollId,
    //   votes: newVotes,
    //   answer: currentAns,
    // });

    await axios.put(`/api/polls/${pollId}`, {
      _id: pollId,
      votes: newVotes,
      answer: currentAns,
    });
  };

  useEffect(() => {
    const status = localStorage.getItem('pollVoted');

    if (status) {
      setVoted(true);
    } else {
      setVoted(false);
    }
  }, []);
  return (
    <Box
      w={'full'}
      maxWidth={'100rem'}
      minH={'calc(100vh - 60px)'}
      py={['2rem', null, '4rem']}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'start'}
      flexDir={'column'}
      gap={'5rem'}
      bgColor={'#f1f1f1'}
    >
      <Heading as={'h1'} color={'titleDark'} fontSize={'3rem'}>
        Sondajul Săptămânii
      </Heading>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox status={'error'}>{error}</MessageBox>
      ) : (
        <>
          {poll.map((item) => (
            <Box
              key={item._id}
              maxWidth={'800px'}
              border={'1px solid green'}
              boxShadow={'0 5px 1rem rgba(0,0,0,0.2)'}
              borderRadius={'2rem'}
              py={'2rem'}
              px={'2rem'}
              w={'full'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              flexDir={'column'}
              gap={'3rem'}
              color={'textDark'}
            >
              <Heading
                w={'fit-content'}
                textAlign={'center'}
                as={'h2'}
                color={'titleDark'}
              >
                {item.question}
              </Heading>
              <form onSubmit={submitHandler}>
                <RadioGroup
                  w={['300px', null, '700px']}
                  onChange={setValue}
                  value={value}
                >
                  <Flex flexDir={'column'} gap={'3rem'} alignItems={'center'}>
                    {item.answers.map((item, index) => (
                      <Radio
                        borderColor={'primary'}
                        key={index}
                        w={'full'}
                        size={'lg'}
                        value={index.toString()}
                        isDisabled={voted}
                        _disabled={{ borderColor: 'gray' }}
                      >
                        {item.answer} <Icon icon={item.icon} />
                      </Radio>
                    ))}
                    <Divider />
                    <Buttons
                      btnType={'submit'}
                      bgColor={'primary'}
                      color={'textLight'}
                      bgHover={'subtitleLight'}
                      icon={CheckIcon}
                      text={'votează'}
                      disabled={voted}
                      onClick={() => setVoted(true)}
                    />
                  </Flex>
                </RadioGroup>
              </form>
            </Box>
          ))}
        </>
      )}

      {voted && (
        <>
          {poll.map((item) => (
            <Box
              key={item._id}
              flexDir={'column'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              gap={'1rem'}
            >
              {item.answers.map((item) => (
                <Box
                  key={item._id}
                  color={'#000'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  gap={'1rem'}
                >
                  {item.answer}
                  <Progress
                    border={'1px solid green'}
                    borderRadius={'2rem'}
                    w={['300px', null, '500px']}
                    value={item.votes}
                    height={'30px'}
                    hasStripe
                    isAnimated
                    colorScheme={'facebook'}
                  />
                  {item.votes} Voturi
                </Box>
              ))}
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default PollPage;
