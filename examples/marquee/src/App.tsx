import { createSignal, For } from 'solid-js';

import { Marquee, MarqueeProps, MarqueeRef } from '@suyongs/solid-utility';

const LOREM_IPSUM = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt mollis iaculis. Vestibulum nibh orci, dapibus sed ex eget, luctus lobortis libero. Mauris efficitur dui eget nisi pellentesque, nec consectetur nisi faucibus. Pellentesque fringilla, sapien quis volutpat euismod, est leo varius tortor, nec venenatis dui metus nec arcu. Integer eget efficitur lorem, nec condimentum enim. Nam eget aliquam orci. Ut laoreet felis id sem volutpat scelerisque. Sed auctor feugiat ante vel gravida. Maecenas vitae aliquet risus, non consequat lectus. Donec ut mauris elementum, cursus diam et, bibendum ante. Nam cursus facilisis erat, maximus blandit erat pellentesque eu. Nulla bibendum imperdiet orci sit amet commodo. Quisque justo libero, congue pulvinar nibh ac, dictum sollicitudin dui.
`;

function App() {
  const [randomText, setRandomText] = createSignal('text');
  const [gap, setGap] = createSignal(0);
  const [speed, setSpeed] = createSignal(70);
  const [customText, setCustomText] = createSignal('Custom Text');
  const [mode, setMode] = createSignal('auto');
  const [dummyLength, setDummyLength] = createSignal(5);
  const [autoUpdate, setAutoUpdate] = createSignal(true);
  const [marquees, setMarquees] = createSignal<MarqueeRef[]>([]);

  const updateRandomText = () => {
    const newText = LOREM_IPSUM.slice(0, ~~(Math.random() * 200));

    setRandomText(newText);
  };

  return (
    <div class={'container'}>
      <div class={'card'}>
        <div class={'card-title'}>
          Auto Mode
        </div>
        <button onClick={() => updateRandomText()}>
          Change
        </button>
        <Marquee>
          {randomText()}
        </Marquee>
      </div>
      <div class={'card'}>
        <div class={'card-title'}>
          Speed
        </div>
        <Marquee speed={10}>
          {LOREM_IPSUM.slice(0, 100)}
        </Marquee>

        <Marquee speed={35}>
          {LOREM_IPSUM.slice(0, 200)}
        </Marquee>

        <Marquee speed={70}>
          {LOREM_IPSUM.slice(0, 300)}
        </Marquee>

        <Marquee speed={140}>
          {LOREM_IPSUM.slice(0, 400)}
        </Marquee>
      </div>
      <div class={'card'}>
        <div class={'card-title'}>
          direction
        </div>
        <Marquee mode={'scroll'} direction={'left'}>
          {LOREM_IPSUM.slice(0, 100)}
        </Marquee>

        <Marquee mode={'scroll'} direction={'right'}>
          {LOREM_IPSUM.slice(0, 100)}
        </Marquee>

        <Marquee mode={'scroll'} direction={'up'}>
          {LOREM_IPSUM.slice(0, 100)}
        </Marquee>

        <Marquee mode={'scroll'} direction={'down'}>
          {LOREM_IPSUM.slice(0, 100)}
        </Marquee>
      </div>
      <div class={'card'}>
        <div class={'card-title'}>
          Element
        </div>
        <Marquee>
          <span class={'tag'}>
            {LOREM_IPSUM.slice(0, 20)}
          </span>
          <span class={'tag'}>
            {LOREM_IPSUM.slice(20, 40)}
          </span>
          <span class={'tag'}>
            {LOREM_IPSUM.slice(40, 60)}
          </span>
          <span class={'tag'}>
            {LOREM_IPSUM.slice(60, 80)}
          </span>
          <span class={'tag'}>
            {LOREM_IPSUM.slice(80, 100)}
          </span>
        </Marquee>
      </div>
      <div class={'card'}>
        <div class={'card-title'}>
          Custom Text
        </div>
        <select value={mode()} onInput={(event) => setMode(event.target.value)}>
          <option>auto</option>
          <option>scroll</option>
          <option>hover</option>
          <option>force-hover</option>
          <option>truncate</option>
        </select>
        <input
          type={'number'}
          placeholder={'gap'}
          value={gap()}
          onInput={(event) => setGap(event.target.valueAsNumber)}
        />
        <input
          type={'number'}
          placeholder={'speed'}
          value={speed()}
          onInput={(event) => setSpeed(event.target.valueAsNumber)}
        />
        <input
          placeholder={'Write your own text'}
          value={customText()}
          onInput={(event) => setCustomText(event.target.value)}
        />
        <Marquee gap={gap()} speed={speed()} mode={mode() as MarqueeProps<any>['mode']}>
          {customText()}
        </Marquee>
      </div>
      <div class={'card performance-card'}>
        <div class={'card-title'}>
          Update
        </div>
        <input
          type={'number'}
          placeholder={'count'}
          value={dummyLength()}
          onInput={(event) => setDummyLength(event.target.valueAsNumber)}
        />
        <label>
          Auto Update
          <input
            type={'checkbox'}
            checked={autoUpdate()}
            onChange={(event) => setAutoUpdate(event.target.checked)}
          />
        </label>
        <button
          onClick={() => {
            marquees().forEach((marquee) => {
              marquee.updateOverflow();
            });
          }}
        >
          Force Update
        </button>
        <For each={Array.from({ length: dummyLength() }).map((_, i) => i)}>
          {(i) => (
            <Marquee
              ref={(element) => {
                setMarquees((prev) => {
                  prev[i] = element;
                  return prev;
                });
              }}
              autoUpdate={autoUpdate()}
              gap={32}
              class={'performance'}
            >
              index: {i} / {LOREM_IPSUM.slice(0, 100)}
            </Marquee>
          )}
        </For>
      </div>
    </div>
  );
}

export default App;
