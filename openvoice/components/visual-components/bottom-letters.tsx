import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BottomLetters = () => {
  return (
    <footer className="flex justify-between">
      <p id="ovapp" className="relative">
        © 2025 ovapp
      </p>
      <ul id="list" className="flex gap-2" role="list">
        <li className="flex items-center gap-2">
          <a className="relative rounded-sm text-gray-1000">About</a>
        </li>
        <li className="flex items-center gap-2">
          <a className="relative rounded-sm text-gray-1000">GitHub</a>
        </li>
        <li className="flex items-center gap-2 ">
          <a className="relative rounded-sm text-gray-1000">Docs</a>
        </li>
        <li className="flex items-center gap-2 ">
          <Select>
            <SelectTrigger className="relative rounded-xl text-gray-1000 w-[85px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent id="languageSelect" className="rounded-xl">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Espanõl</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
            </SelectContent>
          </Select>
        </li>
      </ul>
    </footer>
  );
};

export default BottomLetters;
